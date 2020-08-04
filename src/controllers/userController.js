import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

exports.register = (req, res) => {
  console.log('registering: ', req.body)
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  console.log('new user: ', newUser)
  newUser.save((err, user) => {
    console.log('saved')
    if (err) {
      return res.status(400).send({
          message: err
      });
    } else {
      let loggedinUser = {}
      for (let key of Object.keys(user._doc)) {
        loggedinUser[key] = user[key];
      }
      loggedinUser.hashPassword = undefined;
      loggedinUser.token = jwt.sign({ email: user.email, username: user.username, _id: user.id}, process.env.SESSION_SECRET);
      return res.json(loggedinUser);
    }
  })
}

exports.login = (req, res) => {
   User.findOne({
       email: req.body.email
   }, (err, user) => {
       if (err) throw err;
       if (!user) {
           res.status(401).json({ message: 'Authentication failed. No user found!'});
       } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password!'});
            } else {
                    let loggedinUser = {}
                    for (let key of Object.keys(user._doc)) {
                        loggedinUser[key] = user[key];
                    }
                    loggedinUser.hashPassword = undefined;
                    loggedinUser.token = jwt.sign({ email: user.email, username: user.username, _id: user.id}, process.env.SESSION_SECRET);
                    return res.json(loggedinUser);
            }
    }
   }); 
}

exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!'});
    }
}
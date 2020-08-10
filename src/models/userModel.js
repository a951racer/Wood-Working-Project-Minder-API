import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    created_date: {
       type: Date,
       default: Date.now 
    },
    firstName: String,
    lastName: String,
    dba: String,
    units: {
      type: String,
      enum: ['inches', 'cm'],
      default: 'inches'
    },
    roughLength: Number,
    roughWidth: Number
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

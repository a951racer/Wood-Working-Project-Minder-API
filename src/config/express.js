import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

module.exports = function() {
    dotenv.config();
    const app = express();

    app.use(cors());
    if (process.env.NODE_ENV !== 'production')
        app.use(morgan('dev'));
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // JWT setup
    app.use((req, res, next) => {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.SESSION_SECRET, (err, decode) => {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            }); 
        } else {
            req.user = undefined;
            next();
        }
    });

    require('../routes/userRoutes')(app);
    require('../routes/projectRoutes')(app);

    app.use(express.static('public'));
    
    return app;
}

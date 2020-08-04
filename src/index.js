import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');

const db = configureMongoose();
const app = configureExpress();

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

const PORT = process.env.PORT || 4800

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);

module.exports = app;

console.log(`Server running on port: ${PORT}`)

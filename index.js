const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
const app = express();

let router = require('express').Router();
const dbConfig = require('./database.config.js');

const questionRoutes = require('./routes/question.route');

const enableCORS = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', request.headers.origin);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Date, X-Date');
    return next();
};
app.use(cors());
app.use(enableCORS);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);;
app.use('/api', router)
app.use('/api/question', questionRoutes);

const port = process.env.PORT || 8000;

const server = app.listen(function () {
    console.log('Listening on port http://localhost:' + port);
});
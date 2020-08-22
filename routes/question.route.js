const express = require('express');
const app = express();
const questionRoutes = express.Router();

// Require Question model in our routes module
let Question = require('../models/question');

// Defined store route
questionRoutes.route('/add').post(function (req, res) {
    let question = new Question(req.body);
    question.save()
        .then(question => {
            res.status(200).json({ 'question': 'Question added successfully' });
        })
        .catch(err => {
            res.status(400).send("OOPS...Something went wrong.!!!");
        });
});

// Defined get data(index or listing) route
questionRoutes.route('/get').get(function (req, res) {
    Question.find(function (err, questions) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(questions);
        }
    });
});

module.exports = questionRoutes;
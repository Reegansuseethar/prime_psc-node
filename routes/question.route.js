const express = require('express');
const app = express();
const questionRoute = express.Router();

let Question = require('../models/question');
let Group = require('../models/group');
let Subgroup = require('../models/subgroup');

// Add Question
questionRoute.route('/addQuestion').post((req, res, next) => {
    Question.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({ message: 'Question added successfully.!' });
        }
    })
});

// Get all Question
questionRoute.route('/getAll').get((req, res) => {
    Question.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)

            for (let i in data) {
                Group.findById(data[i].questionGroup, (err, groups) => {
                    if (err) {
                        return next(err)
                    } else {
                        data.filter(data => {
                            if (data[i].questionGroup == groups._id) {
                                data[i].groupName = groups.questionGroup;
                            }
                        })
                    }

                })
            }
            // res.json(data)
        }
    })
})

// Get single Question
questionRoute.route('/getQuestionById/:id').get((req, res) => {
    Question.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Question
questionRoute.route('/updateQuestion/:id').put((req, res, next) => {
    Question.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ message: 'Question updated successfully.!' });
        }
    })
})

// Delete Question
questionRoute.route('/deleteQuestion/:id').delete((req, res, next) => {
    Question.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ message: "Question removed.!" })
        }
    })
})

module.exports = questionRoute;
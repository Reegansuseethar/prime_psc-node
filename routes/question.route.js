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
            groupArr = [];
            // questionArr = [];
            Group.find().lean().exec((err, groups) => {
                if (err) {
                    return next(err)
                } else {
                    for (let i in data) {
                        var obj = JSON.parse(JSON.stringify(data[i]))
                        obj.groupName = '';
                        for (let j in groups) {
                            if (data[i].questionGroup == groups[j]._id) {
                                obj.groupName += groups[j].questionGroup;
                            }
                        }
                        groupArr.push(obj);
                    }
                }
            })

            Subgroup.find().lean().exec((error, subgroups) => {
                if (error) {
                    return next(error)
                } else {
                    var questionArr = [];
                    for (let i in groupArr) {
                        var obj = JSON.parse(JSON.stringify(groupArr[i]))
                        obj.subgroupName = '';
                        for (let k in subgroups) {
                            if (groupArr[i].questionSubgroup == subgroups[k]._id) {
                                obj.subgroupName += subgroups[k].questionSubgroup;
                            }
                        }
                        questionArr.push(obj);
                    }
                    if (questionArr.length) {
                        res.json(questionArr);
                    }
                }
            })
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
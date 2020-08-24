const express = require('express');
const app = express();
const questionRoute = express.Router();

let Question = require('../models/question');

// Add Question
questionRoute.route('/add-question').post((req, res, next) => {
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
            res.json(data)
        }
    })
})

// // Get single Question
// questionRoute.route('/read-question/:id').get((req, res) => {
//   Question.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })


// // Update Question
// questionRoute.route('/update-question/:id').put((req, res, next) => {
//   Question.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Question successfully updated!')
//     }
//   })
// })

// Delete Question
questionRoute.route('/delete-question/:id').delete((req, res, next) => {
    Question.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ message: "Question removed.!" })
        }
    })
})

module.exports = questionRoute;
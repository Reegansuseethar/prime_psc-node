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
            res.status(200).json({ 'message': 'Question added successfully' });
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

// // Get single student
// questionRoute.route('/read-student/:id').get((req, res) => {
//   Student.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })


// // Update student
// questionRoute.route('/update-student/:id').put((req, res, next) => {
//   Student.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Student successfully updated!')
//     }
//   })
// })

// // Delete student
// questionRoute.route('/delete-student/:id').delete((req, res, next) => {
//   Student.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
//   })
// })

module.exports = questionRoute;
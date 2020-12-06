const express = require('express');
const app = express();
const examRoute = express.Router();

let Exam = require('../models/examresult');

// Add User
examRoute.route('/saveResult').post((req, res, next) => {
  Exam.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({ message: 'Exam Submitted.!' });
    }
  })
});

module.exports = examRoute;
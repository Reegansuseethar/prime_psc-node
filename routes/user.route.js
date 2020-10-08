const express = require('express');
const app = express();
const userRoute = express.Router();

let User = require('../models/user');

// Add User
userRoute.route('/userSave').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({ message: 'User added successfully.!' });
    }
  })
});

module.exports = userRoute;
const express = require('express');
const app = express();
const groupRoute = express.Router();

let Group = require('../models/group');


// Add Group
groupRoute.route('/addGroup').post((req, res, next) => {
    Group.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({ message: 'Group added successfully.!' });
        }
    })
});

// Get all Group
groupRoute.route('/getAllGroup').get((req, res) => {
    Group.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Group
groupRoute.route('/getGroupById/:id').get((req, res) => {
    Group.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Group
groupRoute.route('/updateGroup/:id').put((req, res, next) => {
    Group.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ message: 'Group updated successfully.!' });
        }
    })
})

// Delete Group
groupRoute.route('/deleteGroup/:id').delete((req, res, next) => {
    Group.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ message: "Group removed.!" })
        }
    })
})

module.exports = groupRoute;
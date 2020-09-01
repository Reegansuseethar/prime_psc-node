const express = require('express');
const app = express();
const groupRoute = express.Router();

let Group = require('../models/group');
let Subgroup = require('../models/subgroup');


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

// Get Group & Subgroup
groupRoute.route('/getGroupandSubgroup').get((req, res, next) => {
    Group.find((error, groups) => {
        if (error) {
            return next(error)
        } else {
            var newArr = [];
            Subgroup.find().lean().exec((error, subgroups) => {
                if (error) {
                    return next(error)
                } else {
                    for (let i in groups) {
                        var obj = JSON.parse(JSON.stringify(groups[i]))
                        obj.subgroups = [];
                        for (let j in subgroups) {
                            if (groups[i]._id == subgroups[j].questionGroupid) {
                                obj.subgroups.push(subgroups[j]);
                            }
                        }
                        newArr.push(obj)
                    }
                    res.json(newArr);
                }
            })

        }
    })
})

module.exports = groupRoute;
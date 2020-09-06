const express = require('express');
const app = express();
const subgroupRoute = express.Router();

let Subgroup = require('../models/subgroup');
let Group = require('../models/group');


// Add Subgroup
subgroupRoute.route('/addSubgroup').post((req, res, next) => {
    Subgroup.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({ message: 'Subgroup added successfully.!' });
        }
    })
});

// Get all Subgroup
subgroupRoute.route("/getAllSubgroup").get((req, res) => {
    Subgroup.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            Group.find().lean().exec((err, groups) => {
                if (err) {
                    return next(err)
                } else {
                    conArr = [];
                    for (let i in data) {
                        var obj = JSON.parse(JSON.stringify(data[i]))
                        obj.groupName = '';
                        for (let j in groups) {
                            if (data[i].questionGroup == groups[j]._id) {
                                obj.groupName += groups[j].questionGroup;
                            }
                        }
                        conArr.push(obj);
                    }
                    res.json(conArr);
                }
            })
        }
    })
});

// Get single Subgroup
subgroupRoute.route('/getSubgroupById/:id').get((req, res) => {
    Subgroup.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Subgroup
subgroupRoute.route('/updateSubgroup/:id').put((req, res, next) => {
    Subgroup.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ message: 'Subgroup updated successfully.!' });
        }
    })
})

// Delete Subgroup
subgroupRoute.route('/deleteSubgroup/:id').delete((req, res, next) => {
    Subgroup.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ message: "Subgroup removed.!" })
        }
    })
})

//get Subgroup by Group ID
subgroupRoute.route('/getSubGroupByGroupId/:id').get((req, res) => {
    Subgroup.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            let groupdata = [];
            data.filter(data => {
                if (data.questionGroupid == req.params.id) {
                    groupdata.push(data);
                }
            })
            res.json(groupdata)
        }
    })
})

module.exports = subgroupRoute;
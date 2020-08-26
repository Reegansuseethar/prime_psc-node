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
// subgroupRoute.route('/getAllSubgroup').get((req, res) => {
//     Subgroup.find((error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

subgroupRoute.route("/getAllSubgroup").get((req, res) => {
    Subgroup.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            var conArr = []
            for (let i in data) {
                Group.findById(data[i].questionGroupid, (error, datas) => {
                    if (error) {
                        return next(error)
                    } else {
                        conArr.push({ questionGroup: datas.questionGroup, questionSubgroup: data[i].questionSubgroup, _id: data[i]._id });
                    }
                })
            }
        }
        setTimeout(() => {
            res.json(conArr);
        }, 500);
    })
});

// Get single Subgroup
subgroupRoute.route('/getSubGroupById/:id').get((req, res) => {
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


module.exports = subgroupRoute;
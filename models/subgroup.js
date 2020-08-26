const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Subgroup = new Schema({
    questionGroupid: {
        type: String
    },
    questionSubgroup: {
        type: String
    }
}, {
    collection: 'subgroup_master'
})

module.exports = mongoose.model('Subgroup', Subgroup)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Group = new Schema({
  questionGroup: {
    type: String
  }
}, {
  collection: 'group_master'
})

module.exports = mongoose.model('Group', Group)
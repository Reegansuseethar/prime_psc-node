const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Question
let Question = new Schema({
  questionId: {
    type: Number
  },
  questionName: {
    type: String
  },
  questionGroup: {
    type: String
  },
  questionSubgroup: {
    type: Number
  },
  option1: {
    type: String
  },
  option2: {
    type: String
  },
  option3: {
    type: String
  },
  option4: {
    type: String
  }
}, {
  collection: 'question'
});

module.exports = mongoose.model('Question', Question);
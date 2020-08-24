const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
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
    type: String
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
  collection: 'question_master'
})

module.exports = mongoose.model('Question', Question)
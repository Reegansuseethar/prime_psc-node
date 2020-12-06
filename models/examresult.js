const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Exam = new Schema({
    name: {
        type: String
    },
    id: {
        type: String
    },
    email: {
        type: String
    },
    mark: {
        type: String
    },
    status: {
        type: String
    }
}, {
    collection: 'exam_master'
})

module.exports = mongoose.model('Exam', Exam)


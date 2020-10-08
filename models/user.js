const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
    name: {
        type: String
    },
    userID: {
        type: String
    },
    provider: {
        type: String
    },
    email: {
        type: String
    }
}, {
    collection: 'user_master'
})

module.exports = mongoose.model('User', User)


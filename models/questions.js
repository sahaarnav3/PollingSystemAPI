const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamp: true
});

const Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;
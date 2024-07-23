const mongoose = require('mongoose');
const Questions = require('./questions');

const optionsSchema = mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number
    },
    link_to_vote: {
        type: String,
        required: true
    }
})

const Options = mongoose.model('Options', optionsSchema);
module.exports = Options;
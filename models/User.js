const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    slackId: {
        type: String,
        required: true,
    },
    honorAmount: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);
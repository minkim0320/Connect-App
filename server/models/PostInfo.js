const mongoose = require('mongoose');

const PostInfoSchema = new mongoose.Schema({
    creator: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    contact: {
        type: String
    },
    memberdesc: {
        type: String
    },
    teamdesc: {
        type: String
    },
    nummembers: {
        type: String
    },
    picurl: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = PostInfo = mongoose.model('postinfo', PostInfoSchema);

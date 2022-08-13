const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    id: String,
    type: Number, // nano, mini, macro
    idx: Number,
    startDate: Date,
    endDate: Date,
    isTeam: Boolean
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge

const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    type: Number, // nano, mini, macro
    idxChallenge: Number,
    startDate: Date,
    endDate: Date,
    isTeam: Boolean,
    teams: [String],
    mentor: String,
    app: String
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    idea: String,
    challengeId: String,
    shift: Number,
    members: [String],
    challengeStatement: String,
    mentor: String,
    app: String
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team

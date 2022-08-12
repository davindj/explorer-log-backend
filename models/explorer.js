const mongoose = require('mongoose');

const explorerSchema = new mongoose.Schema({
    name: String,
    expertise: Number,
    image: String,
    shift: Number,
    mentor: String,
    isMentor: Boolean
});

const Explorer = mongoose.model('Explorer', explorerSchema);

module.exports = Explorer

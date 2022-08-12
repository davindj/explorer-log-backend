//// MongoDB
// getting-started.js
const mongoose = require('mongoose');
require('dotenv').config()

const connstring = process.env.MONGO_CONNSTRING
mongoose.connect(connstring, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected!')
});

//// Server Server
const express = require('express')
const app = express()
// Route
const explorerRouter = require('./routes/explorer')
const teamRouter = require('./routes/team')
const challengeRouter = require('./routes/challenge')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use('/explorers', explorerRouter)
app.use('/teams', teamRouter)
app.use('/challenges', challengeRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res)=>{
    console.log('ExplorerLOG Server started at port:', PORT)
})
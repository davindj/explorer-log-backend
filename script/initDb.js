const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const { Challenge, Team, Explorer } = require('../models');

async function main(){
	// Connect to Database
	const connstring = process.env.MONGO_CONNSTRING
	let db = null
	try{
		console.log("Connecting to", connstring)
		db = await mongoose.connect(connstring, {
			useNewUrlParser: true, 
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 3000
		});
		console.log("Connected!")
	}catch(err){
		console.log(err)
		console.log("Connection failed!")
		return
	}

	// Load Data
	const explorers = []
	const challenges = []
	const teams = []
	try{
		console.log("Load data...")
		explorers.push(...loadExplorers())
		challenges.push(...loadChallenges())
		teams.push(...loadTeams())
		console.log("Data loaded!")
	}catch(err){
		console.log(err)
		console.log("Load data failed!")
		return
	}

	// Mongo DML
	await Explorer.deleteMany()
	await Challenge.deleteMany()
	await Team.deleteMany()

	await Explorer.insertMany(explorers)
	await Challenge.insertMany(challenges)
	await Team.insertMany(teams)
	console.log("Database succesfully initialized!")
	db.connection.close()
	return 
}

function loadExplorers(){
	return loadJSON(path.join(__dirname, './src/explorers.json'))
}
function loadChallenges(){
	return loadJSON(path.join(__dirname, './src/challenges.json'))
}
function loadTeams(){
	return loadJSON(path.join(__dirname, './src/teams.json'))
}
function loadJSON(filename){
	const rawfile = fs.readFileSync(filename)
	const objects = JSON.parse(rawfile)
	return objects
}


// MAIN
main()
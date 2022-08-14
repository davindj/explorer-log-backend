const express = require('express')
const { Team, Explorer } = require('../models')
const router = express.Router()

// Get All Team (Team Home)
router.get('/', async(req, res)=>{
    const {
        challengeId,
        member
    } = req.query

    const aggregations = []
    if(challengeId != null){
        aggregations.push({ $match: { challengeId } })
    }
    if(member != null){
        aggregations.push({ $match: { members: member } })
    }
    aggregations.push({
        '$lookup': {
          'from': 'explorers', 
          'localField': 'mentor', 
          'foreignField': 'name', 
          'as': 'mentor'
        }
    });
    aggregations.push({
        '$lookup': {
            'from': 'explorers', 
            'localField': 'members', 
            'foreignField': 'name', 
            'as': 'members'
        }
    });
    aggregations.push({
        '$lookup': {
            'from': 'challenges', 
            'localField': 'challengeId', 
            'foreignField': 'id', 
            'as': 'challenge'
        }
    });
    aggregations.push({ $unwind: '$mentor' })
    aggregations.push({ $unwind: '$challenge' })
    aggregations.push({
        $set: {
            "challenge.startDate": { $toLong: "$challenge.startDate" },
            "challenge.endDate": { $toLong: "$challenge.endDate" },
        }
    })
    aggregations.push({
        '$project': {
            '_id': 0, '__v': 0, 
            'members': { '_id': 0, '__v': 0 }, 
            'mentor': { '_id': 0, '__v': 0 }, 
            'challenge': { '_id': 0, '__v': 0 }, 
            'challengeId': 0
        }
    })
    aggregations.push({ $sort: { name: 1 } })

    const teams = await Team.aggregate(aggregations)
    res.status(200).json(teams)
})

module.exports = router
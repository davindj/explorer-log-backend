const express = require('express')
const { Team, Explorer } = require('../models')
const router = express.Router()

// Get All Team (Team Home)
router.get('/', async(req, res)=>{
    const {
        type: challengeType,
        idx: challengeIdx,
        member
    } = req.query
    let teams = []
    //// Aggregate
    let aggregates = [ // Join sm table challenge
        {
            $lookup:
            {
              from: "challenges",
              localField: "challengeType",
              foreignField: "type",
              as: "challenge"
            }
        },  
        {	$unwind :"$challenge" },
        { 
            $addFields: { 
                mid: { 
                    $cond: [ 
                        { $eq: [ '$challengeIdx', '$challenge.idxChallenge' ] }, 
                        1, 0 
                    ] 
                }
            } 
        },
        { $match : { mid : 1} },
    ]
    // Check Table Challenge
    if(challengeType != null && challengeIdx != null){
        aggregates.push({
            $match: {
                challengeType: parseInt(challengeType),
                challengeIdx: parseInt(challengeIdx)
            }
        })
    }else if(member != null){
        aggregates.push({
            $match: { members: member }
        })
    }
    // Join Member
    aggregates.push(...[
        {
            $unwind: "$members"
        },
        {
            $lookup: {
              from: "explorers",
              localField: "members",
              foreignField: "name",
              as: "member"
            }
        },
        { $unwind: "$member" },
        { 
            $group:{
                _id: "$_id",
                name: { $first: "$name" },
                idea: { $first: "$idea" },
                challengeType: { $first: "$challengeType" },
                challengeIdx: { $first: "$challengeIdx" },
                challengeStatement: { $first: "$challengeStatement"},
                challenge: { $first: "$challenge" },
                shift: { $first: "$shift" },
                members: { $push: "$member" } 
            } 
        }, 
    ])
    // Select as
    aggregates.push({
        $project: {
            name: 1,
            idea: 1,
            challenge: {
                type: "$challenge.type",
                idxChallenge: "$challenge.idxChallenge",
                startDate: {
                    $toLong : "$challenge.startDate"
                },
                endDate: {
                    $toLong : "$challenge.endDate"
                },
                isTeam: "$challenge.isTeam",
            },
            challengeStatement: 1,
            shift: 1,
            members: 1
        }
    })
    // Jika kosong maka select all
    teams = await Team.aggregate(aggregates)
    res.status(200).json(teams)
})

// Get Team Mentor
router.get('/:id/mentor', async(req,res)=>{
    const { id } = req.params
    const team = await Team.findById(id)

    const explorer = await Explorer.findOne({
        name: { $regex: team.mentor }
    })
    res.status(200).json(explorer)
})

module.exports = router
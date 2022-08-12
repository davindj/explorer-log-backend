const express = require('express')
const { Challenge } = require('../models')
const router = express.Router()

// Get All Challenge (Challenge Home)
router.get('/', async(req, res)=>{
    const challenges = await Challenge.aggregate([
        {
            $project: {
                type: 1,
                idxChallenge: 1,
                startDate: {
                    $toLong : "$startDate"
                },
                endDate: {
                    $toLong : "$endDate"
                },
                isTeam: 1
            }
        },
        { $sort: {startDate: -1} }
    ])
    res.status(200).json(challenges)
})

module.exports = router
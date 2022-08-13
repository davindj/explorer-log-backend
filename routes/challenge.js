const express = require('express')
const { Challenge } = require('../models')
const router = express.Router()

// Get All Challenge (Challenge Home)
router.get('/', async(req, res)=>{
    const challenges = await Challenge.aggregate([
        { $project: { _id:0, __v:0 } },
        {
            $set: {
                startDate: { $toLong: "$startDate" },
                endDate: { $toLong: "$endDate" },
            }
        },
        { $sort: {startDate: -1} }
    ])
    res.status(200).json(challenges)
})

module.exports = router
const express = require('express')
const { Explorer } = require('../models')
const router = express.Router()

// Get All Explorer (Explorer Home)
router.get('/', async(req, res)=>{
    const {
        mentor
    } = req.query

    const aggregations = []
    if(mentor == 1){
        aggregations.push({ $match: { isMentor: true } })
    }else if(mentor == 0){
        aggregations.push({ $match: { isMentor: false } })
    }
    aggregations.push({ $sort: { shift:1, name:1 } })
    aggregations.push({ $project: { _id:0, __v:0 } })

    const explorers = await Explorer.aggregate(aggregations)
    res.status(200).json(explorers)
})

// Get Specific Explorer
router.get('/:name', async(req,res)=>{
    const { name } = req.params
    const explorer = await Explorer.findOne({name}, { _id:0, __v:0 })
    res.status(200).json(explorer)
})

module.exports = router
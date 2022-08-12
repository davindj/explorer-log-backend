const express = require('express')
const { Explorer } = require('../models')
const router = express.Router()

// Get All Explorer (Explorer Home)
router.get('/', async(req, res)=>{
    const {
        mentor
    } = req.query
    let explorers = []
    if(mentor == 1){
        explorers = await Explorer.aggregate([
            { $match: { shift:2 } },
            { $sort: { shift:1, name:1 } },
            { 
                $project: { 
                    _id: 0,
                    name: 1,
                    expertise: 1,
                    image: 1,
                    shift: 1
                }
            }
        ])
    }else if(mentor == 0){
        explorers = await Explorer.aggregate([
            { 
                $match: {
                    $or: [
                        { shift: 0 },
                        { shift: 1 },
                    ],
                }
            },
            { $sort: { shift:1, name:1 } },
            { 
                $project: { 
                    _id: 0,
                    name: 1,
                    expertise: 1,
                    image: 1,
                    shift: 1
                }
            }
        ])
    }else{
        explorers = await Explorer.aggregate([
            { $sort: { shift:1, name:1 } },
            { 
                $project: { 
                    _id: 0,
                    name: 1,
                    expertise: 1,
                    image: 1,
                    shift: 1
                }
            }
        ])
    }
    res.status(200).json(explorers)
})

// Get Specific Explorer
router.get('/:name/mentor', async(req,res)=>{
    const { name } = req.params
    const member = await Explorer.findOne({name})

    const [explorer] = await Explorer.aggregate([
        { $match: { name: member.mentor } },
        { 
            $project: { 
                _id: 0,
                name: 1,
                expertise: 1,
                image: 1,
                shift: 1
            }
        }
    ])

    res.status(200).json(explorer)
})

module.exports = router
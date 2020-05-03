const express = require('express');
const Board = require('../model/Board');
const mongoose = require('mongoose');
const router = express.Router();
router.ws('/get_boards', function(ws, req, next) {
    console.log("sas");
    //TODO: check if user authorized
    const id = mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047");//req.user._id
    Board.aggregate([
        {$match: {$or: [{creatorId: id, members: id}]}},
        {
            $lookup:{
                from: 'users',
                localField: 'creatorId',//
                foreignField: '_id',
                as: 'creatorId'
            }
        },
        {$unwind: "$creatorId"},
        {$unwind: "$members"},
        {
            $lookup:{
                from: 'users',
                localField: 'members',//
                foreignField: '_id',
                as: 'members'
            }//TODO: add project
        }, {$group: {
                _id: "$_id", creator: {$first: "$creatorId"}, name: {$first: "$name"}, addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, members: { $addToSet: "$members" }
            }//TODO: add project
        }]).then(r => ws.send(JSON.stringify(r)));

    ws.on('message', function(msg) {//TODO: On add board
        ws.send(msg);
    })
});

module.exports = router;

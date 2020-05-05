
const Board = require('../model/Board');
const mongoose = require('mongoose');

function getBoards(ws, req, next) {
    console.log("sas");
    //TODO: check if user authorized
    const id = mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047");//req.user._id
    Board.aggregate([
        {$match: {$or: [{creatorId: id, members: id}]}},
        {
            $lookup:{
                from: 'users',
                localField: 'creatorId',
                foreignField: '_id',
                as: 'creatorId'
            }
        },
        {$unwind: "$creatorId"},
        {$project: {"creatorId._id": 0, "creatorId.hash": 0, "creatorId.active": 0, "creatorId.activatorId": 0, "creatorId.registrationData": 0}},
        {$unwind: "$members"},
        {
            $lookup:{
                from: 'users',
                localField: 'members',//
                foreignField: '_id',
                as: 'members'
            }
        },
        {$project:{"members._id": 0, "members.hash": 0, "members.active": 0, "members.activatorId": 0, "members.registrationData": 0}},
        {$group: {
                _id: "$_id", creator: {$first: "$creatorId"}, name: {$first: "$name"}, description: {$first: "$description"},
                addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, members: { $addToSet: "$members" }
            }
        },
        //{$project: {_id: 0}}
    ]).then(r => ws.send(JSON.stringify(r)));

    ws.on('message', function(msg) {//TODO: On add board
        ws.send(msg);
    })
}

function getDetailedBoard(ws, req) {
    //req
    //console.log(req.params.id);
    Board.findById(req.params.id)
        .then(r => ws.send(JSON.stringify(r)));
}

module.exports = { getBoards, getDetailedBoard };

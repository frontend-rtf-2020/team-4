
const Board = require('../model/Board');
const Column = require('../model/Column');
const mongoose = require('mongoose');

function getBoards(ws, req) {
    //TODO: save the socket
    console.log('user: ' + req.user);
    const id = req.user._id;//mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047");//req.user._id
    Board.aggregate([
        {$match: {$or: [{creatorId: id}, {members: id}]}},
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
        {$unwind: "$members"},
        {$project:{"members._id": 0, "members.hash": 0, "members.active": 0, "members.activatorId": 0, "members.registrationData": 0}},
        {$group: {
                _id: "$_id", creator: {$first: "$creatorId"}, name: {$first: "$name"}, description: {$first: "$description"},
                addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, members: { $addToSet: "$members" }
            }
        },
        //{$project: {_id: 0}}
    ]).then(r => ws.send(JSON.stringify(r)));

    ws.on('message', function(msg) {
        //TODO: add adding board
        ws.send(msg);
    });

    ws.on('close', function() {
        //TODO: remove ws
    });
}

function getDetailedBoard(ws, req) {
    const id = req.params.id;//"5eafafc5d07fde1f84b44873";
    //TODO: save the socketc
    //console.log(req.user._id.toString());
    Board.findById(id)
        .then(b => {
            if(b.creatorId.toString() !== req.user._id.toString() && b.members.indexOf(req.user._id) === -1)
            {
                ws.send('{"error": "Wrong id"}');
                return;
            }
            Column.aggregate([
                {$match: {board: mongoose.Types.ObjectId(id)} /*{$and: [{board: mongoose.Types.ObjectId(id)},{$or: [{creatorId: id}, {editorsId: id}]}]}*/},
                {$unwind: "$tasks"},
                {
                    $lookup:{
                        from: 'tasks',
                        localField: 'tasks',//
                        foreignField: '_id',
                        as: 'tasks'
                    }
                },
                {$unwind: "$tasks"},
                {
                    $lookup:{
                        from: 'users',
                        localField: 'tasks.workerId',//
                        foreignField: '_id',
                        as: 'tasks.worker'
                    }
                },
                {$unwind: "$tasks.worker"},
                {$group: {
                        _id: "$_id", name: {$first: "$name"}, description: {$first: "$description"},
                        addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, board: {$first: "$board"}, tasks: { $addToSet: "$tasks" }
                    }
                }
            ]).then(columns => {
                ws.send(JSON.stringify({
                    board: b ,
                    columns: columns
                }));
                //res.send(r)
            });
        });

    ws.on('message', function(msg) {
        //TODO:
        ws.send(msg);
    });
    ws.on('close', function() {
        //TODO: remove ws
    });
}

// eslint-disable-next-line no-unused-vars
function editBoard(ws, req) {
    //TODO: save the socket

    // eslint-disable-next-line no-unused-vars
    ws.on('message', msg => {
        //TODO: Add message editing of board
    });
}


module.exports = { getBoards, getDetailedBoard, editBoard };

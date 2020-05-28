
const Board = require('../model/Board');
const Column = require('../model/Column');
const mongoose = require('mongoose');

const getBoardSockets = {}; // It is all sockets for getBoard

function getBoard(id, match = {$match: {$or: [{creatorId: id}, {members: id}]}}) {
    return Board.aggregate([
        match,
        {
            $lookup:{
                from: 'users',
                localField: 'creatorId',
                foreignField: '_id',
                as: 'creator'
            }
        },
        {$unwind: "$creator"},
        {$project: {"creatorId.hash": 0, "creatorId.active": 0, "creatorId.activatorId": 0, "creatorId.registrationData": 0}},
        {
            $lookup:{
                from: 'users',
                localField: 'members',
                foreignField: '_id',
                as: 'members'
            }
        },
        {$project:{"members._id": 0, "members.hash": 0, "members.active": 0, "members.activatorId": 0, "members.registrationData": 0}},

    ])
}


function getBoards(ws, req) {

    //TODO: save the socket
    getBoardSockets[req.user._id.toString()] = ws;

    console.log('user: ' + req.user);
    const id = req.user._id;


    getBoard(id)
        .then(r => ws.send(JSON.stringify(r)))
        .catch(e => console.log(e));

    ws.on('message', function(msg) {
        //TODO: add adding board
        console.log(msg);
        const board = JSON.parse(msg);
         if (board._id) { // Checking, does it new or changed board?
              //TODO: //If '_id' exist, therefore it is a changed board
         } else {   //If '_id' does not exist, therefore it is a new board
                const newBoard = new Board(); //Adding new board in DB
                newBoard.creatorId = req.user._id;
                console.log(req.user._id);
                newBoard.name = board.name;
                console.log(board.name);
                newBoard.description = board.description;
                console.log(board.description);
                newBoard.members[0] = req.user._id;
                newBoard.save();  //Saving new board in DB
                console.log(newBoard._id);
                console.log(newBoard._id.toString());
                newBoard.members.forEach(m => console.log(m._id.toString()));
                getBoard(newBoard._id)   //Trying send new board to all her members (in developing);
                    .then(r => newBoard.members.forEach(m => getBoardSockets[m._id.toString()].send(JSON.stringify(r))))
                    .catch(e => console.log(e));
         }

    });

    ws.on('close', function() {
        //TODO: remove ws
        delete getBoardSockets[req.user._id];
    });
}

function getDetailedBoard(ws, req) {
    const id = req.params.id;
    //TODO: save the sockets
    console.log(id);
    getBoard(id, {$match: { _id: mongoose.Types.ObjectId(id) }})
        .then(b => {
            console.log(b);
            if(b[0].creator._id.toString() !== req.user._id.toString() && b[0].members.find(m => m._id === req.user._id) === -1)
            {
                ws.send('{"error": "Wrong id"}');
                return;
            }
            Column.aggregate([
                {$match: {board: mongoose.Types.ObjectId(id)}},
                {
                    $lookup:{
                        from: 'tasks',
                        localField: 'tasks',
                        foreignField: '_id',
                        as: 'tasks'
                    }
                },
                {$unwind: "$tasks"},
                {
                    $lookup:{
                        from: 'users',
                        localField: 'tasks.workerId',
                        foreignField: '_id',
                        as: 'tasks.worker'
                    }
                },
                {$unwind: "$tasks.worker"},
                {$project:{"tasks.worker.login": 1, "tasks.name": 1, "tasks.endDate": 1, "tasks.done": 1, "orderNumber": 1, "_id": 1, "name": 1, "tasks.description": 1}},
                {$group: {
                        _id: "$_id", name: {$first: "$name"}, description: {$first: "$description"}, orderNumber: {$first: "$orderNumber"}, tasks: { $addToSet: "$tasks" }
                    }
                }
            ]).then(columns => {
                ws.send(JSON.stringify({
                    board: b[0],
                    columns: columns
                }));
                
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


const Column = require('../model/Column');
const mongoose = require('mongoose');
const getBoard = require('./getBoard');
const boardSockets = {};//All sockets for detailed board page

function detailedBoardWSHandler(ws, req) {
    const boardId = req.params.id;  //"5eafafc5d07fde1f84b44873";
    const userId = req.user._id.toString();
    //save the sockets
    if(boardSockets[boardId])
        //Due to each user has multiple boards we have to store for each boardId own dictionary similar to boardListSockets
        boardSockets[boardId][userId] = ws;
    else
        boardSockets[boardId] = {[userId]: ws};
    console.log(boardId);
    //console.log(req.user._id.toString());
    getBoard(boardId, {$match: { _id: mongoose.Types.ObjectId(boardId) }})
        .then(b => {
            console.log(b);
            if(b[0].creator._id.toString() !== req.user._id.toString() && b[0].members.find(m => m._id === req.user._id) === -1)
            {
                ws.send('{"error": "Wrong boardId"}');
                return;
            }
            Column.aggregate([
                {$match: {board: mongoose.Types.ObjectId(boardId)}},
                //{$unwind: "$tasks"},
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
                //console.log(columns);
                ws.send(JSON.stringify({
                    board: b[0],
                    columns: columns
                }));
                //res.send(r)
            });
        });

    ws.on('message', msg => replyDetailedBoardMessage(msg));
    ws.on('close', () => closeDetailedBoard(boardId, userId));
}

function closeDetailedBoard(boardId, userId) {
    // remove ws
    delete boardSockets[boardId][userId];
    if(!Object.keys(boardSockets[boardId]).length)//if there is no users seeing this board, remove it from dictionary
        delete boardSockets[boardId];
}

function replyDetailedBoardMessage(msg) {
    //TODO:
    console.log(msg);
    const data = JSON.parse(msg);
    if(data._id) {
        if(data.update) {//TODO: update

        }
        else { //deletion
            mongoose.connection.models[data.collection]
                .findByIdAndRemove(data._id , {useFindAndModify: false} , (err, obj) => {
                    //TODO: send data

                })
        }
    }
    else {
        //TODO: creation
    }
}

module.exports = detailedBoardWSHandler;

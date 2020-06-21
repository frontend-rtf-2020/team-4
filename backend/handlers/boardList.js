

const Column = require('../model/Column');
const sendBoardData = require("./sendBoardData");

const Task = require('../model/Task');
const Board = require('../model/Board');
const getBoard = require('./getBoard');
const boardListSockets = {}; // It is all sockets for getBoard


function boardListWSHandler(ws, req) {

    boardListSockets[req.user._id.toString()] = ws;

    const id = req.user._id;

    getBoard(id)
        .then(r => ws.send(JSON.stringify(r)))
        .catch(e => console.log(e));

    ws.on('message', msg => replyBoardListMessage(msg, id));

    ws.on('close', function() {
        //remove ws
        console.log('close');
        delete boardListSockets[id];
    });
}

//TODO:Split into several functions
async function replyBoardListMessage(msg , userId) {
    //adding board
    console.log(msg);
    const board = JSON.parse(msg);
    if (board._id) { // Checking, does it new or changed board?
        //If '_id' exist, therefore it is a changed board
        if (board.update)//editing
            Board.findByIdAndUpdate(board._id , board.update , {useFindAndModify: false , new: true} ,
                (err , board) => {
                    console.log(board);
                    sendBoardData(board.members , boardListSockets)
                });
        else
        {
            Board.findByIdAndRemove(board._id , {useFindAndModify: false} ,
                (err , board) => sendBoardData(board.members , boardListSockets));

            for await (const column of Column.find({boardId: board._id} , {useFindAndModify: false})) {
                Task.deleteMany({_id: { $in: column.tasks }}, console.log);
                Column.findByIdAndRemove(column._id, {useFindAndModify: false}, console.log);
            }
        }
    }
    else {
        const newBoard = new Board();
        newBoard.creatorId = userId;
        console.log(userId);
        newBoard.name = board.name;
        console.log(board.name);
        newBoard.description = board.description;
        console.log(board.description);
        newBoard.members[0] = userId;
        newBoard.save(function (err , newBoard) {
            if (err) console.error(err);
            else sendBoardData(newBoard.members , boardListSockets);
        });
    }
}


module.exports =  boardListWSHandler;

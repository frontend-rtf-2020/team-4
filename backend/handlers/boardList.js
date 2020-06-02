
const Board = require('../model/Board');
const getBoard = require('./getBoard');
const boardListSockets = {}; // It is all sockets for getBoard



function sendBoard(members) {
    //console.log(boardListSockets);
    members.forEach(m => getBoard(m._id)
        .then(r => {
            const id = m._id.toString();
            // eslint-disable-next-line no-prototype-builtins
            if(boardListSockets.hasOwnProperty(id))
                boardListSockets[id].send(JSON.stringify(r));
        })
        .catch(e => console.log(e)));
}

function boardListWSHandler(ws, req) {
    //save the socket
    boardListSockets[req.user._id.toString()] = ws;

    //console.log(boardListSockets);
    const id = req.user._id;//mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047");//req.user._id

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


function replyBoardListMessage(msg, userId) {
    //adding board
    //ws.send(msg);
    console.log(msg);
    const board = JSON.parse(msg);
    if (board._id) { // Checking, does it new or changed board?
        //If '_id' exist, therefore it is a changed board
        if (board.update)//editing
            Board.findByIdAndUpdate(board._id , board.update , {useFindAndModify: false , new: true} ,
                (err , board) => {
                    console.log(board);
                    sendBoard(board.members)
                });
        else//deletion
            Board.findByIdAndRemove(board._id , {useFindAndModify: false} ,
                (err , board) => sendBoard(board.members));
    }
    else {   //If '_id' does not exist, therefore it is a new board
        const newBoard = new Board(); //Adding new board in DB
        newBoard.creatorId = userId;
        console.log(userId);
        newBoard.name = board.name;
        console.log(board.name);
        newBoard.description = board.description;
        console.log(board.description);
        newBoard.members[0] = userId;
        newBoard.save(function (err, newBoard) {
            if (err) console.error(err);
            else sendBoard(newBoard.members);
        });  //Saving new board in DB
        //console.log(newBoard._id.toString());//Trying send new board to all her members (in developing);
        // newBoard.members.forEach(m => getBoard(m._id).then(r => boardListSockets[m._id.toString()].send(JSON.stringify(r))).catch(e => console.log(e)));
    }
}


module.exports =  boardListWSHandler;// getDetailedBoard: detailedBoardWSHandler };

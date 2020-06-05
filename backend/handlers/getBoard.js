
const Board = require('../model/Board');

function getBoard(id, match = {$or: [{creatorId: id}, {members: id}]}) {
    return Board.find(match)
        .populate('members', 'email login')
        .populate('creatorId', 'email login')
        .exec()
}

module.exports = getBoard;

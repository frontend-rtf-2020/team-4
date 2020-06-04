
const Board = require('../model/Board');

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
        //{$unwind: "$members"},
        {
            $lookup:{
                from: 'users',
                localField: 'members',//
                foreignField: '_id',
                as: 'members'
            }
        },
        //{$unwind: "$members"},
        {$project:{ "members.hash": 0, "members.active": 0, "members.activatorId": 0, "members.registrationData": 0}},

    ])
        //.then(r => JSON.stringify(r));
}

module.exports = getBoard;

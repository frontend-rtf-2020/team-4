const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = mongoose.model('Board', new Schema({
    creatorId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    members : {
        type : Schema.Types.ObjectId,
        required : true
    },
    addingDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
}));

module.exports = Board;

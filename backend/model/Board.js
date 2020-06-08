const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = mongoose.model('Board', new Schema({
    creatorId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    name : {
        type: String,
        required : true
    },
    members : [{
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    }],
    description : {
        type: String,
        required: false
    }
}));

module.exports = Board;

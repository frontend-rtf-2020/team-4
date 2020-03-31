const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = mongoose.model('Task', new Schema({
    creatorId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },

    column : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'Column'
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : false
    },
    addingDate : {
        type : Date,
        default : Date.now,
        required : true,
    },
    endDate : {
        type : Date,
        required : false
    },
    done : {
        type : Boolean,
        required : false
    }
}));

module.exports = Task;

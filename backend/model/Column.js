const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Column = mongoose.model('Column', new Schema({
    /*creatorId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    editorsId : [ {
        type : Schema.Types.ObjectId,
        required : false,
        ref: 'User'
    } ],*/
    tasks: [
        {
            type : Schema.Types.ObjectId,
            required : true,
            ref: 'Task'
        }
    ],
    orderNumber: {
        type: Number
    },
    name : {
        type : String,
        required : true
    },
    board : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'Board'
    }
}));

//Requires adding an update hook for editorsId field

module.exports = Column;

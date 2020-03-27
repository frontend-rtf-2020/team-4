const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Column = mongoose.model('Board', new Schema({
    creatorId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    editorsId : {
        type : String,
        required : false
    },
    name : {
        type : String,
        required : true
    },
    board : {
        type : Schema.Types.ObjectId,
        required : true
    },
    addingDate : {
        type : Date,
        default : Date.now(),
        required : true
    },
    endDate : {
        type : Date,
        required : false
    },
}));

//Requires adding an update hook for editorsId field

module.exports = Column;

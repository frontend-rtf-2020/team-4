const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Column = mongoose.model('Column', new Schema({
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
    name: {
        type : String,
        required : true
    },
    boardId: {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'Board'
    }
}));


module.exports = Column;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = mongoose.model('Board', new Schema({
    creatorId: Schema.Types.ObjectId,
    name: String,
    members: [Schema.Types.ObjectId],
    addingDate: Date,
    endDate: Date,
}));

module.exports = Board;

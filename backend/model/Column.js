const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Column = mongoose.model('Board', new Schema({creatorId: Schema.Types.ObjectId,
    name: String,
    board: Schema.Types.ObjectId,
    addingDate: Date,
    endDate: Date,
}));

module.exports = Column;

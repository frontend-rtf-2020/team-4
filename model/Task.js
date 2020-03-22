const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = mongoose.model('Task', new Schema({
    userId: Schema.Types.ObjectId,
    column: Schema.Types.ObjectId,
    name: String,
    description: String,
    addingDate: Date,
    endDate: Date,
    done: Boolean
}));

module.exports = Task;

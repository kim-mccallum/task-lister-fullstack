const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  complete: Boolean
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
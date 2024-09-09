import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const Task = mongoose.model('Task', taskSchema);

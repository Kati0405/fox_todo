import { Task } from '../models/Tasks.js';

export const createTask = async (req, res) => {
  try {
    const { text } = req.body;
    const task = new Task({ text });
    const result = await task.save();
    res.status(200).send({ message: 'Success', task: result });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send({ message: 'Success', tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.status(200).send({ message: 'Success', task });
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const editTask = async (req, res) => {
  try {
    const { text, isDone } = req.body;
    if (typeof text === 'undefined' && typeof isDone === 'undefined') {
      return res.status(400).send({ message: 'No fields to update' });
    }
    const result = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { text, isDone } },
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.status(200).send({ message: 'Success', task: result });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res
      .status(200)
      .send({ message: `Task with id: ${req.params.id} was deleted` });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

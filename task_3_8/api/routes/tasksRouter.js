import express from 'express';
import {
  getTasks,
  createTask,
  getTaskById,
  editTask,
  deleteTask,
} from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', editTask);
router.delete('/:id', deleteTask);

export const tasksRouter = router;

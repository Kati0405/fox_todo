import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { tasksRouter } from './routes/tasksRouter.js';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process to avoid hanging
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(
  cors({
    origin: 'https://fox-todo.vercel.app',
  })
);

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

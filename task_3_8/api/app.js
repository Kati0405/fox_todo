import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import { tasksRouter } from './routes/tasksRouter.js';

const app = express();

app.use(cors());

mongoose.connect(
  'mongodb+srv://k_kovshykova:verystrongpassword@kkovcluster.gwnk0hh.mongodb.net/fox-todo?retryWrites=true&w=majority&appName=kkovCluster'
);

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

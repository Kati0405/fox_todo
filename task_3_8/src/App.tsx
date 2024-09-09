// import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import './App.css';
import { TaskInput } from './components/TaskInput/TaskInput';
import { Task } from './types/types';
import { TaskList } from './components/TaskList/TaskList';

const API_URL = 'http://localhost:3000/api';

// export const App = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   const addTask = (taskText: string) => {
//     const newTask = { text: taskText, isDone: false };
//     setTasks([...tasks, newTask]);
//   };

//   const toggleTaskDone = (index: number) => {
//     const updatedTasks = tasks.map((task, i) =>
//       i === index ? { ...task, isDone: !task.isDone } : task
//     );
//     setTasks(updatedTasks);
//   };

//   const deleteTask = (index: number) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   return (
//     <div className='container'>
//       <TaskInput addTask={addTask} />
//       <TaskList
//         tasks={tasks}
//         toggleTaskDone={toggleTaskDone}
//         deleteTask={deleteTask}
//       />
//     </div>
//   );
// };

const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get<{ message: string; tasks: Task[] }>(
    `${API_URL}/tasks`
  );
  return data.tasks;
};
const addTaskAPI = async (task: Task) => {
  const { data } = await axios.post<{ message: string; task: Task }>(
    `${API_URL}/tasks`,
    task
  );
  return data.task;
};

const editTaskAPI = async (task: Task) => {
  console.log('second');
  const { data } = await axios.put<{ message: string; task: Task }>(
    `${API_URL}/tasks/${task._id}`,
    {
      text: task.text,
      isDone: task.isDone,
    }
  );
  console.log(data);
  return data.task;
};

const toggleTaskDoneAPI = async (task: Task) => {
  const { data } = await axios.put<{ message: string; task: Task }>(
    `${API_URL}/tasks/${task._id}`,
    {
      isDone: !task.isDone,
    }
  );
  return data.task;
};

const deleteTaskAPI = async (task: Task) => {
  await axios.delete(`${API_URL}/tasks/${task._id}`);
};

export const App = () => {
  const queryClient = useQueryClient();

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: addTaskAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error adding task:', error);
    },
  });

  // Toggle task done mutation
  const toggleTaskDoneMutation = useMutation({
    mutationFn: toggleTaskDoneAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error toggling task done:', error);
    },
  });

  // Edit task mutation
  const editTaskMutation = useMutation({
    mutationFn: editTaskAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error editing task:', error);
    },
  });
  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting task:', error);
    },
  });

  const addTask = (taskText: string) => {
    addTaskMutation.mutate({ _id: uuidv4(), text: taskText, isDone: false });
  };

  const toggleTaskDone = (task: Task) => {
    toggleTaskDoneMutation.mutate(task);
  };

  const editTask = (task: Task) => {
    console.log(task);
    editTaskMutation.mutate(task);
  };

  const deleteTask = (task: Task) => {
    deleteTaskMutation.mutate(task);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tasks</div>;
  }

  return (
    <div className='container'>
      <TaskInput addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTaskDone={toggleTaskDone}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
};

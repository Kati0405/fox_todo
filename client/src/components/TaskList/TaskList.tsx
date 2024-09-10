import { TaskItem } from '../TaskItem/TaskItem';
import { Task } from '../../types/types';

interface TaskListProps {
  tasks: Task[];
  toggleTaskDone: (task: Task) => void;
  deleteTask: (task: Task) => void;
  editTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskDone,
  deleteTask,
  editTask,
}) => {
  if (!Array.isArray(tasks)) {
    return <div>Invalid task data</div>;
  }
  return (
    <ul className='tasks-container'>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          toggleTaskDone={toggleTaskDone}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

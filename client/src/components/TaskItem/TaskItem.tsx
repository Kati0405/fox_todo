import { useState } from 'react';
import { Task } from '../../types/types';

import './TaskItem.css';

import delete_icon from '../../assets/delete.svg';
import edit_icon from '../../assets/edit.svg';
import confirm_icon from '../../assets/confirm.svg';
import Checkbox from '../../stories/Checkbox/Checkbox';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (task: Task) => void;
  deleteTask: (task: Task) => void;
  editTask: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleTaskDone,
  deleteTask,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleConfirmClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedText(editedText);
    const updatedTask = { ...task, text: editedText };
    editTask(updatedTask);
    setIsEditing(false);
  };

  const handleTaskClick = () => {
    toggleTaskDone(task);
  };

  return (
    <li key={task._id}>
      <button
        className={`task-box ${task.isDone ? 'crossed-out' : ''} ${isEditing ? 'editing' : ''}`}
        onClick={handleTaskClick}
      >
        <Checkbox
          checked={task.isDone}
          onChange={() => toggleTaskDone(task)}
          ariaLabel='Mark task as done'
        />
        <div className='text-field-wrapper'>
          <textarea
            className={`text-field ${task.isDone ? 'crossed-out' : ''}`}
            value={isEditing ? editedText : task.text}
            onChange={(e) => {
              setEditedText(e.target.value);
            }}
            readOnly={!isEditing}
            onClick={(e) => {
              if (isEditing) {
                e.stopPropagation();
              }
            }}
          />
        </div>
        <div className='buttons-container'>
          {!isEditing && !task.isDone && (
            <button className='edit-btn' onClick={handleEditClick}>
              <img src={edit_icon} alt='Edit' />
            </button>
          )}
          {!isEditing && (
            <button
              className='delete-btn'
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task);
              }}
            >
              <img src={delete_icon} alt='Delete' />
            </button>
          )}
          {isEditing && (
            <button className='confirm-btn' onClick={handleConfirmClick}>
              <img src={confirm_icon} alt='Confirm' />
            </button>
          )}
        </div>
      </button>
    </li>
  );
};

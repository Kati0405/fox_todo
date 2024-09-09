import './TaskInput.css';
import Button from '../../stories/Button/Button';
import { ChangeEvent, useState } from 'react';

interface TaskInputProps {
  addTask: (taskText: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className='task-input-container'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        className='task-input'
        placeholder='Type here to add a task...'
      />
      <Button
        variant='primary'
        onClick={handleAddTask}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          width: '5rem',
        }}
      >
        + Add
      </Button>
    </div>
  );
};

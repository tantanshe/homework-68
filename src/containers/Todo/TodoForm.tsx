import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodo, fetchTodo} from './todoSlice';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title: title,
      completed: false,
    };
    await dispatch(addTodo(newTask));
    await dispatch(fetchTodo())
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
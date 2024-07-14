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
    await dispatch(fetchTodo());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 mt-3">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-3">Add Task</button>
      </div>
    </form>
  );
};

export default TodoForm;
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTodo, editTodo, fetchTodo} from './todoSlice';

interface TodoTaskProps {
  id: string;
  title: string;
  completed: boolean;
}

const TodoTask: React.FC<TodoTaskProps> = ({id, title, completed}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = async () => {
    const updatedTodo = {title, completed: !completed};
    await dispatch(editTodo({id, updatedTodo}));
    await dispatch(fetchTodo());
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
      <span>
        {title}
      </span>
        <div>
          <input type="checkbox" checked={completed} onChange={handleToggle} className="me-5"/>
          <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TodoTask;
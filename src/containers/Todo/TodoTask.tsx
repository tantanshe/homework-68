import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTodo} from './todoSlice';

interface TodoTaskProps {
  id: string;
  title: string;
}

const TodoTask: React.FC<TodoTaskProps> = ({ id, title }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      {title}
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default TodoTask;
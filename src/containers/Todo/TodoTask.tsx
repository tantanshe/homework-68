import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTodo} from './todoSlice';

interface TodoTaskProps {
  id: string;
  title: string;
}

const TodoTask: React.FC<TodoTaskProps> = ({ id, title }) => {
  const dispatch = useDispatch();

  return (
    <li>
      {title}
      <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
    </li>
  );
};

export default TodoTask;
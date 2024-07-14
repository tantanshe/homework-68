import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodo} from './todoSlice';
import TodoTask from './TodoTask';
import {RootState} from '../../app/store';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todo);
  const loading = useSelector((state: RootState) => state.todo.loading);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!todos || todos.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoTask id={todo.id} {...todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
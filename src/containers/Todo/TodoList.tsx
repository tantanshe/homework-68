import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodo} from './todoSlice';
import TodoTask from './TodoTask';
import {RootState} from '../../app/store';
import Spinner from '../../components/Spinner/Spinner';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todo);
  const loading = useSelector((state: RootState) => state.todo.loading);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  if (loading) {
    return <Spinner/>;
  }

  if (!todos || todos.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="mb-3 p-2 border rounded">
          <TodoTask id={todo.id} {...todo} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
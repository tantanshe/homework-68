import './App.css';
import TodoList from './containers/Todo/TodoList';
import TodoForm from './containers/Todo/TodoForm';

const App = () => {

  return (
    <>
      <h1 className='text-center'>To-do list</h1>
      <TodoForm/>
      <TodoList/>
    </>
  );
};

export default App;

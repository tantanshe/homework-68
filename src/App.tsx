import './App.css';
import TodoList from './containers/Todo/TodoList';
import TodoForm from './containers/Todo/TodoForm';

const App = () => {

  return (
    <>
      <TodoForm/>
      <TodoList/>
    </>
  );
};

export default App;

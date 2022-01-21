import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import ControlsPanel from './components/ControlsPanel';
const App = () => {

  return (
    <div className="app">
      <h1>Todo List</h1>
      <NewTodo/>
      <Todos/>
      <ControlsPanel/>
    </div>
  );
}

export default App;
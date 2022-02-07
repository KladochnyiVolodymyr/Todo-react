import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import ControlsPanel from './components/ControlsPanel';
import { ToastContainer} from 'react-toastify';
import { useAppStateContext } from "./context/AppContext";

const App = () => {

  const { loading } = useAppStateContext();

  return (
    <div className="app container-fluid">
      <h1>Todo List</h1>
      {
        !loading ? (
          <>
            <NewTodo/>
            <Todos/>
            <ControlsPanel/>
            <ToastContainer />
          </>
        ) : 'Loading...'
      }
    </div>
  );
}

export default App;
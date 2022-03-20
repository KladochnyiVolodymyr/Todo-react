import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import ControlsPanel from './components/ControlsPanel';
import { ToastContainer} from 'react-toastify';
import { initItems } from "./redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const App = () => {

  const loading = useSelector(state => state.loader.loading);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(initItems());
  }, []);

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
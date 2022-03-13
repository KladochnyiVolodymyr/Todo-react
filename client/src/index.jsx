import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import App from './App';
import { AppContextProvider } from "./context/AppContext";
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from './redux/rootReducer';
import { Provider as ReduxProvider } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  )
));

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


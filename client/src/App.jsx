import React, { useEffect } from 'react';
import api from "./api";
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
const App = () => {
  
  useEffect(() => {
    //api.todoList.fetchAll().then(res => console.log(res));
  });

  /* addTodo = () =>
    api.todoList.create(
      {
        'title':'title'
      }
      ).then(res => console.log(res));
 */

  return (
    <div className="app">
      <h1>Todo List</h1>
      <NewTodo/>
      <Todos/>
    </div>
  );
}

export default App;
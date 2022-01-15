import { Component } from "react";
import api from "./api";

class App extends Component {
  componentDidMount() {
    api.todoList.fetchAll().then(res => console.log(res));
  }

  addTodo = () =>
    api.todoList.create(
      {
        'title':'title'
      }
      ).then(res => console.log(res));

  render() {
    return (
      <h1>Hello from App.jsx
        <p onClick={this.addTodo}>click</p>
      </h1>
    );
  }
}

export default App;

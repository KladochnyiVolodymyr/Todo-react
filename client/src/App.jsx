import { Component } from "react";
import api from "./api";

class App extends Component {
  componentDidMount() {
    api.todo.fetchAll().then(res => console.log(res));
  }

  addFilm = () =>
    api.todo.create(
      {
        'title':'title'
      }
      ).then(res => console.log(res));

  render() {
    return (
      <h1>Hello from App.jsx
        <p onClick={this.addFilm}>click</p>
      </h1>
    );
  }
}

export default App;

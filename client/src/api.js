import axios from "axios";


const api = {
    todoList: {
        fetchAll: () => axios.get("/api/todoList").then((res) => res.data.todo),
        create: (todo) => axios.post("/api/todoList", { todo }).then((res) => res.data.todo),
    },
}

export default api;
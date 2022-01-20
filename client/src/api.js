import axios from "axios";


const api = {
    todoList: {
        fetchAll: () => axios.get("/api/todoList").then((res) => res.data.todo),
        create: (todo) => axios.post("/api/todoList", { todo }).then((res) => res.data.todo),
        update: (todo) => axios.put(`/api/todoList/${todo._id}`, { todo }).then((res) => res.data.todo),
        delete: (id) => axios.delete(`/api/todoList/${id}`),
    },
}

export default api;
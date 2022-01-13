import axios from "axios";


const api = {
    todo: {
        fetchAll: () => axios.get("/api/todo").then((res) => res.data.todo),
        create: (film) => axios.post("/api/todo", { film }).then((res) => res.data.film),
    },
}

export default api;
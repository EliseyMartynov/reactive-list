const fetchPostUtil = () => fetch("/api/todos/", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ todos: localStorage.getItem("todos") })
});

export default fetchPostUtil;
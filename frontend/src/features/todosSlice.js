import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    initialTodos(state, action) {
      const { todos } = action.payload;
      state = todos;
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    },
    addTodo(state, action) {
      const { id, text } = action.payload;
      state.push({ id, text, completed: false });
      localStorage.setItem("todos", JSON.stringify(state));
    },
    completeTodo(state, action) {
      const { id } = action.payload;
      const x = state.find((item) => item.id === id);
      x.completed = !x.completed;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    editTodo(state, action) {
      const { id, text } = action.payload;
      const x = state.find((item) => item.id === id);
      x.text = text;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo(state, action) {
      const { id } = action.payload;
      state = state.filter((item) => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    },
    reorderTodo(state, action) {
      const { before, after } = action.payload;
      const el = state.splice(before, 1);
      state.splice(after, 0, el[0]);
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    },
    clearTodo(state, action) {
      state = [];
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    },
  },
});

export const {
  initialTodos,
  addTodo,
  completeTodo,
  editTodo,
  deleteTodo,
  reorderTodo,
  clearTodo,
} = todosSlice.actions;

export default todosSlice.reducer;

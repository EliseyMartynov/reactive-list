import { configureStore } from '@reduxjs/toolkit';
import todosSliceReducer from './features/todosSlice'
import authSliceReducer from './features/authSlice'

const todos = JSON.parse(localStorage.getItem('todos'));
const token = JSON.parse(localStorage.getItem('token'));

export default configureStore({
  reducer: {
   todos: todosSliceReducer,
   token: authSliceReducer
  },
  preloadedState: {
    todos: todos ? todos : [],
    token: token ? token : null
  }
});

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Input from "../components/Input";
import Todos from "../components/Todos";
import Message from "../components/Message";
import { DragDropContext } from "react-beautiful-dnd";
import { initialTodos, reorderTodo } from "../features/todosSlice.js";
import fetchPost from '../utils/fetchPostUtil'

const Main = () => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");

  useEffect(async () => {
    const res = await fetch("api/todos", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }   
    });
    const data = await res.json();
    setResponse(data);
    if (data.todos) {
      dispatch(initialTodos({ todos: JSON.parse(data.todos) }))
    }
  }, []);

  const onDragEnd = async result => {
    const { destination, source } = result;
    dispatch(reorderTodo({ before: source.index, after: destination.index }));
    await fetchPost();
  };

  return (
    <>
      {response.error ? (
        <Message message={response.error} style="error" />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Header />
          <Input />
          <Todos />
        </DragDropContext>
      )}
    </>
  );
};

export default Main;

import React, { useState } from "react";
import styles from "../styles/Input.module.css";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearTodo } from "../features/todosSlice";
import { removeToken } from "../features/authSlice";
import Message from "./Message";
import fetchPostUtil from "../utils/fetchPostUtil";
import Spinner from "./Spinner";

const Input = () => {
  const dispatch = useDispatch();

  const [txt, setTxt] = useState("");
  const [response, setResponse] = useState({});

  const modelInput = (e) => {
    setTxt(e.target.value);
  };
  const validationHandler = () => {
    const failStyle = `${styles.inputFailed}`;
    const todoInput = document.querySelector("#todo-input");
    if (txt.match(/[^\s+]/gi) === null || !txt) {
      todoInput.classList.add(failStyle);
    } else {
      if (todoInput.classList.contains(failStyle)) {
        todoInput.classList.remove(failStyle);
      }
    }
  };

  const [loading, setLoading] = useState(false);

  const addTodoHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!(txt.match(/[^\s+]/gi) === null || !txt)) {
      setTxt("");
      const newTodo = {
        id: uuid(),
        text: txt,
      };
      dispatch(addTodo(newTodo));
      const res = await fetchPostUtil();
      const data = await res.json();
      setResponse(data);
    }
    setLoading(false);
  };

  const logoutHandler = () => {
    dispatch(clearTodo());
    dispatch(removeToken());
  };

  return (
    <>
      {response.error ? (
        <Message message={response.error} style="error" />
      ) : (
        <div className={styles.box}>
          <form onSubmit={(e) => addTodoHandler(e)}>
            <i onClick={() => logoutHandler()} className="fas fa-door-open"></i>
            <input
              id="todo-input"
              onKeyUp={() => validationHandler()}
              onChange={(e) => modelInput(e)}
              className={styles.input}
              type="text"
              value={txt}
            />
            <button
              onClick={(e) => addTodoHandler(e)}
              className={styles.btn}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Todo!"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Input;

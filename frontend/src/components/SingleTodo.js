import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/SingleTodo.module.css";
import { completeTodo, editTodo, deleteTodo } from "../features/todosSlice.js";
import { Draggable } from "react-beautiful-dnd";
import fetchPost from '../utils/fetchPostUtil'

const SingleTodo = ({ id, text, completed, index }) => {
  const [localInput, setLocalInput] = useState(text);
  const [edit, setEdit] = useState(false);

  const modelHandler = e => {
    setLocalInput(e.target.value);
  };

  const dispatch = useDispatch();

  const completedHandler = async () => {
    dispatch(completeTodo({ id }));
    await fetchPost();
  };

  const editHandler = () => {
    setEdit(!edit);
  };

  const acceptEditsHandler = async () => {
    dispatch(editTodo({ id, text: localInput }));
    setEdit(!edit);
    await fetchPost();
  };

  const deleteHandler = async () => {
    dispatch(deleteTodo({ id }));
    await fetchPost();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.box}
        >
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={() => completedHandler()}
            checked={completed}
          />
          {/*show close when editing and input*/}
          {!edit ? (
            <span
              onClick={() => completedHandler()}
              className={`${styles.text} ${completed ? styles.outline : ""}`}
            >
              {text}
            </span>
          ) : (
            <div className={styles.inputBox}>
              <input
                className={`${styles.text} ${completed ? styles.outline : ""}`}
                onKeyUp={e => {
                  if (e.keyCode === 27) {
                    editHandler();
                  } else if (e.keyCode === 13) {
                    acceptEditsHandler();
                  }
                }}
                onChange={e => modelHandler(e)}
                value={localInput}
              />
              <i
                onClick={() => editHandler()}
                className="far fa-window-close"
              ></i>
            </div>
          )}
          {/*show accept when editing*/}
          {!edit ? (
            <span onClick={() => editHandler()} className={styles.edit}>
              <i className="fas fa-pen-square"></i>
            </span>
          ) : (
            <span onClick={() => acceptEditsHandler()} className={styles.edit}>
              <i className="far fa-check-square"></i>
            </span>
          )}
          {/*delete button*/}
          <span onClick={() => deleteHandler()} className={styles.delete}>
            <i className="far fa-minus-square"></i>
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;

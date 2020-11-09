import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Message from "./Message";
import Spinner from "./Spinner";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveToken } from "../features/authSlice";

const Login = ({ path }) => {
  const [body, setBody] = useState({
    login: "",
    password: "",
    response: false
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async handlers => {
    setBody({
      ...body,
      response: "pending"
    });
    const data = await fetch("/api/todos/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: body.login,
        password: body.password
      })
    });
    const response = await data.json();
    await setBody({
      ...body,
      response
    });
    if (response.message) {
      dispatch(saveToken({ token: response.message.token }));
      history.push('/todos')
    }
  };

  const bodyHandler = (value, name) => {
    setBody({
      ...body,
      [name]: value
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <label>
          Login
          <input
            name="login"
            className={errors.login && styles.inputFailed}
            ref={register({ required: true, pattern: /[^\s+]/gi })}
            onChange={e => bodyHandler(e.target.value, e.target.name)}
            type="text"
          />
          {errors.login && <span>This field is required</span>}
        </label>
        <label>
          Password
          <input
            name="password"
            className={errors.password && styles.inputFailed}
            ref={register({ required: true })}
            onChange={e => bodyHandler(e.target.value, e.target.name)}
            type="password"
          />
          {errors.password && <span>This field is required</span>}
        </label>
        <input type="submit" className={styles.submit} value="Log in" />
        {body.response === "pending" && <Spinner />}
        {body.response.error && (
          <Message message={body.response.error} style="error" />
        )}
        <span className={styles.noacc}>
          No account yet? <Link to="/signup">Sign up</Link>
        </span>
      </form>
    </>
  );
};

export default Login;

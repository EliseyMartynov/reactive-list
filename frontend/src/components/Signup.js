import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { saveToken } from "../features/authSlice";
import { useForm } from "react-hook-form";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "../styles/Login.module.css";


const Signup = () => {
  const history = useHistory();
  
  const dispatch = useDispatch();
  
  const [body, setBody] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    response: false
  });

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async handlers => {
    setBody({
      ...body,
      response: "pending"
    });
    const data = await fetch("/api/todos/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: body.login,
        password: body.password
      })
    });
    const res = await data.json();
    await setBody({
      ...body,
      response: res
    });
    if(res.message) {
      dispatch(saveToken({ token: res.message.token }));
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
            type="text"
            name="login"
            className={errors.login && styles.inputFailed}
            ref={register({ required: true, pattern: /[^\s+]/gi })}
            onChange={e => bodyHandler(e.target.value, e.target.name)}
          />
          {errors.login && <span>This field is required</span>}
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            className={errors.password && styles.inputFailed}
            ref={register({ required: true })}
            onChange={e => bodyHandler(e.target.value, e.target.name)}
          />
          {errors.password && <span>This field is required</span>}
        </label>
        <label>
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            className={errors.confirmPassword && styles.inputFailed}
            ref={register({
              required: "This field is required",
              validate: value =>
                value === body.password || "Password doesn't match"
            })}
            onChange={e => bodyHandler(e.target.value, e.target.name)}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </label>
        <input
          type="submit"
          className={styles.submit}
          value="Create an account"
        />
        {body.response === "pending" && <Spinner />}
        {body.response.error && (
          <Message message={body.response.error} style="error" />
        )}
        <span className={styles.noacc}>
          <Link to="/">Back to login</Link>
        </span>
      </form>
    </>
  );
};

export default Signup;

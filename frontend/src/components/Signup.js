import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import Message from "./Message";
import Spinner from "./Spinner";

const Signup = () => {
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
    await setBody({
      ...body,
      response: await data.json()
    });
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
        {body.response.message && (
          <Message message={body.response.message} style="info" />
        )}
        <span className={styles.noacc}>
          <Link to="/">Back to login</Link>
        </span>
      </form>
    </>
  );
};

export default Signup;

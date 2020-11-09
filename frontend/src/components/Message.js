import React from "react";
import styles from "../styles/Message.module.css";

const Message = ({ message, style }) => {
  return <div className={`${styles.message} ${styles[style]}`}>
    {message}
  </div>;
};

export default Message;
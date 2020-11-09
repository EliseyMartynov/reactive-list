import React from 'react'
import styles from '../styles/Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.box}>
      <span className={styles.first}></span>
      <span className={styles.second}></span>
      <span className={styles.third}></span>
    </div>
  )
}

export default Spinner
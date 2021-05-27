import React from "react";
import {Link} from 'react-router-dom'
import SignupForm from './SignupForm/SignupForm'
import styles from './Signup.module.css'

const Signup = () => {
  return (
    <div className={styles.container}>
      <SignupForm />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signup;

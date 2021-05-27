import React from 'react'
import styles from './SignupForm.module.css'

const LoginForm = () => {
    return(
        <div className={styles.container}>
            <input placeholder='Your name here...'></input>
            <input placeholder='Your surname here...'></input>
            <input placeholder='Your email here...'></input>
            <input placeholder='Your password here...'></input>
            <input placeholder='Type your password again...'></input>
            <button>Signup</button>
        </div>
    )
}

export default LoginForm
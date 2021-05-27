import React from 'react'
import styles from './LoginForm.module.css'

const LoginForm = () => {
    return(
        <div className={styles.container}>
            <input placeholder='Your email here...'></input>
            <input placeholder='Your password here...'></input>
            <button>Login</button>
        </div>
    )
}

export default LoginForm
import React from 'react'
import styles from './account.module.less'
import Login from './login'
import Register from './register'

const Account = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Login />
                <Register />
            </div>
        </div>
    )
}

export default Account

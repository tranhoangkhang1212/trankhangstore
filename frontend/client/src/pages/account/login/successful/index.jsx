import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { Popover } from 'antd'
import styles from './successful.module.less'

const LoginSuccessful = () => {
    const logout = () => {
        Cookies.remove('token')
        window.location.reload()
    }

    const token = Cookies.get('token')
    const getToken = () => {
        if (token) {
            return jwt_decode(token)
        } else {
            return
        }
    }

    const content = (
        <div>
            <h3 className={styles.name}>
                {token && getToken().full_name}
            </h3>
            <div className={styles.content}>
                <Link to='/orders'>
                    <i class='fas fa-dice-d6'/>
                    Đơn hàng
                </Link>
                <Link to='/'>
                    <i class='fas fa-user-cog'/>
                    Cài đặt
                </Link>
            </div>
        </div>
    )

    return (
        <Popover content={content}>
            <div className={styles.user_info}>
                <i class='far fa-user-circle'/>
                <div>
                    <p>Tài khoản</p>
                    <span onClick={logout}>Đăng xuất</span>
                </div>
            </div>
        </Popover>
    )
}

export default LoginSuccessful

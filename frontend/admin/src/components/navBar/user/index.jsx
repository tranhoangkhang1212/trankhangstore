import React from 'react'
import { Popover } from 'antd'
import styles from './user.module.less'

const User = () => {
    const userData = JSON.parse(
        sessionStorage.getItem('data')
    )

    const logOut = () => {
        sessionStorage.clear()
        window.location.pathname = '/login'
    }

    const content = (
        <div className={styles.user_touch}>
            <div className={styles.setting}>
                <i class='fas fa-user-cog'/>
                <h4>Cài đặt</h4>
            </div>
            <div className={styles.logout} onClick={logOut}>
                <i class='fas fa-sign-out-alt'/>
                <h4>Đăng xuất</h4>
            </div>
        </div>
    )

    return (
        <Popover
            placement='topRight'
            title={userData?.name}
            content={content}
        >
            <div className={styles.user_info}>
                <i class='fas fa-user-astronaut'/>
                <h3>{userData?.name}</h3>
            </div>
        </Popover>
    )
}

export default User

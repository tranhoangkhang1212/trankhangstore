import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import NavBar from '../components/navBar'
import styles from './pages.module.less'

const Pages = () => {
    const navigation = useRoutes(routes)

    return (
        <div className={styles.main}>
            <NavBar />
            <div className={styles.container}>
                {navigation}
            </div>
        </div>
    )
}

export default Pages

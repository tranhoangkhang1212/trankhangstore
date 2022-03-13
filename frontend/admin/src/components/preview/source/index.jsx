import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from './pages.module.less'

const Pages = () => {
    const navigation = useRoutes(routes)

    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.container}>
                {navigation}
            </div>
            <Footer />
        </div>
    )
}

export default Pages

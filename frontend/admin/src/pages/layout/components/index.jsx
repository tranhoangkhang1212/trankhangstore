import React from 'react'
import Logo from './logo'
import Banner from './banner'
import MiniBanner from './miniBanner'
import BannerProductsPage from './bannerProductsPage'
import MiniBannerProductsPage from './miniBannerProductsPage'
import BannerPartner from './bannerPartner'
import styles from './components.module.less'

const components = () => {
    return (
        <div className={styles.container}>
            <Logo />
            <Banner />
            <MiniBanner />
            <BannerProductsPage />
            <MiniBannerProductsPage />
            <BannerPartner />
        </div>
    )
}

export default components

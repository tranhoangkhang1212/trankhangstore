import React from 'react'
import Carousel from '../../components/slider'
import Sale from './components/sale'
import NewProducts from './components/newProducts'
import BestRateProducts from './components/bestRateProducts'
import News from './components/news'

const Home = () => {
    return (
        <>
            <Carousel />
            <Sale />
            <NewProducts />
            <BestRateProducts />
            <News />
        </>
    )
}

export default Home

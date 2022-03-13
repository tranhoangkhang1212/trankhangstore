import React, { useState, useEffect } from 'react'
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './slider.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/layout/get'

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
}

const Carousel = () => {
    const [loading, setLoading] = useState(false)
    const [imagesData, setImagesData] = useState([])
    const [imagesMiniData, setImagesMiniData] = useState([])

    function timeout(ms) {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        )
    }
    const getImagesData = async () => {
        setLoading(true)
        timeout(3000)
        await axios
            .get(
                api +
                    '?type=PRODUCT_BANNER&hide=false&qty=5'
            )
            .then(res => {
                const data = res.data
                setImagesData(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const getImagesMiniData = async () => {
        setLoading(true)
        await axios
            .get(
                api +
                    '?type=PRODUCT_MINI_BANNER&hide=false&qty=4'
            )
            .then(res => {
                const data = res.data
                setImagesMiniData(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getImagesData()
        getImagesMiniData()
    }, [])

    return (
        <div className={styles.carousel}>
            <Spin
                spinning={loading}
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 28,
                        }}
                        spin
                    />
                }
            />

            {loading === false && (
                <Row>
                    <Col
                        className={styles.slider_container}
                        lg={16}
                        md={24}
                    >
                        <Slider
                            className={styles.main_slider}
                            {...settings}
                        >
                            {imagesData.map(image => (
                                <div key={image.id}>
                                    <img
                                        src={image.image}
                                        alt={image.name}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </Col>
                    <Col lg={8}>
                        <div className={styles.mini_slider}>
                            {imagesMiniData.map(image => (
                                <div
                                    key={image.id}
                                    className={
                                        styles.mini_item
                                    }
                                >
                                    <img
                                        src={image.image}
                                        alt={image.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default Carousel

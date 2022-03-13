import { Col, Row } from 'antd'
import React, {
    useContext
} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { layoutContext } from '../../../../pages/layout'
import styles from './slider.module.less'

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
}

const Carousel = () => {
    const context = useContext(layoutContext)

    return (
        <div className={styles.carousel}>
                <Row>
                    <Col
                        className={styles.slider_container}
                        lg={17}
                        md={24}
                    >
                        <Slider
                            className={styles.main_slider}
                            {...settings}
                        >
                            {context.bannerData?.map(
                                image => (
                                    <div key={image.id}>
                                        <img
                                            src={
                                                image.image
                                            }
                                            alt={image.name}
                                        />
                                    </div>
                                )
                            )}
                        </Slider>
                    </Col>
                    <Col lg={7}>
                        <div className={styles.mini_slider}>
                            {context.miniBannerData?.map(
                                image => (
                                    <div
                                        key={image.id}
                                        className={
                                            styles.mini_item
                                        }
                                    >
                                        <img
                                            src={
                                                image.image
                                            }
                                            alt={image.name}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </Col>
                </Row>
        </div>
    )
}

export default Carousel

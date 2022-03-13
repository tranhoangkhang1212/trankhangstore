import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Input } from 'antd'
import { layoutContext } from '../../../../pages/layout'
import styles from './footer.module.less'

const Footer = () => {
    const context = useContext(layoutContext)

    const now = new Date()
    const year = now.getFullYear()

    const { Search } = Input

    const aboutUs = [
        {
            path: '/',
            name: 'Trang chủ',
        },
        {
            path: '/about',
            name: 'Giới thiệu',
        },
        {
            path: '/products',
            name: 'Sản phẩm',
        },
        {
            path: '/news',
            name: 'Tin tức',
        },
        {
            path: '/contact',
            name: 'Liên hệ',
        },
    ]

    const policy = [
        {
            path: '',
            name: 'Bảo hành',
        },
        {
            path: '',
            name: 'Thanh toán',
        },
        {
            path: '',
            name: 'Giao hàng',
        },
        {
            path: '',
            name: 'Hợp tác',
        },
        {
            path: '',
            name: 'Chính sách',
        },
    ]

    return (
        <footer>
            <div className={styles.container}>
                <Row>
                    <Col
                        order={1}
                        xl={6}
                        lg={7}
                        md={{ order: 1, span: 12 }}
                        sm={{ order: 1, span: 12 }}
                        xs={{ order: 4, span: 24 }}
                    >
                        <div className={styles.logo}>
                            <Link to='/'>
                                {context.logoData?.map(
                                    logo => (
                                        <img
                                            src={logo.image}
                                            alt='logo'
                                        />
                                    )
                                )}
                            </Link>
                        </div>
                        <div className={styles.contact}>
                            <h3>Liên hệ với chúng tôi</h3>
                            <div
                                className={
                                    styles.contact_content
                                }
                            >
                                <p>
                                    <i class='fas fa-location-arrow'/>
                                    Địa chỉ:
                                    <span>
                                        {' '}
                                        316/1A Huỳnh Tấn
                                        Phát, Quận 7
                                    </span>
                                </p>
                                <p>
                                    <i class='fas fa-map-marker-alt'/>
                                    Số điện thoại:
                                    <span>
                                        {' '}
                                        +84 945 587 917
                                    </span>
                                </p>
                                <p>
                                    <i class='fas fa-envelope'/>
                                    Email:
                                    <span>
                                        {' '}
                                        trankhangstore@gmail.com
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col
                        xl={5}
                        lg={4}
                        md={{ order: 3, span: 12 }}
                        sm={{ order: 3, span: 12 }}
                        xs={{ order: 2, span: 12 }}
                    >
                        <ul className={styles.list_about}>
                            <h3>Về chúng tôi</h3>
                            {aboutUs.map((item, key) => (
                                <li key={key}>
                                    <Link to='#'>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col
                        xl={5}
                        lg={5}
                        md={{ order: 4, span: 12 }}
                        sm={{ order: 4, span: 12 }}
                        xs={{ order: 3, span: 12 }}
                    >
                        <ul className={styles.list_about}>
                            <h3>Chính sách</h3>
                            {policy.map((item, key) => (
                                <li key={key}>
                                    <Link to='#'>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col
                        className={styles.subscribe}
                        xl={{ order: 4, span: 8 }}
                        lg={{ order: 4, span: 8 }}
                        md={{ order: 2, span: 12 }}
                        sm={{ order: 2, span: 12 }}
                        xs={{ order: 1, span: 24 }}
                    >
                        <h3>Đăng ký nhận tin</h3>
                        <Search
                            placeholder='Nhập email...'
                            enterButton='Send'
                            size='large'
                        />
                        <div className={styles.social}>
                            <h3>Kênh của chúng tôi</h3>
                            <div
                                className={
                                    styles.social_icons
                                }
                            >
                                <a href='face'>
                                    <i class='fab fa-facebook-f'/>
                                </a>
                                <a href='youtube'>
                                    <i class='fab fa-youtube'/>
                                </a>
                                <a href='tiktok'>
                                    <i class='fab fa-tiktok'/>
                                </a>
                                <a href='ins'>
                                    <i class='fab fa-instagram'/>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className={styles.copy_right}>
                    <i class='far fa-copyright'/>
                    {year}
                    <span>||</span>
                    <p>
                        Copyright
                        <span>
                            <a href='/'>
                                {' '}
                                @Trần Hoàng Khang
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

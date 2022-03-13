import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useMount } from 'ahooks'
import { Row, Col, BackTop, Popover } from 'antd'
import {
    UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import { formatCash, discount } from '../../public/function'
import Navigation from './navigation'
import LoginSuccessful from '../../pages/account/login/successful'
import SearchDebounce from '../../pages/search/handleSearch'

import '../header/navigation/navigation.less'
import styles from './header.module.less'

const token = Cookies.get('token')

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/layout/get'

const Header = props => {
    const [logoData, setLogoData] = useState([])

    let TotalCart = 0

    Object.keys(props.items.Carts).forEach(function (item) {
        TotalCart +=
            props.items.Carts[item].quantity *
            discount(
                props.items.Carts[item].price,
                props.items.Carts[item].discount
            )
    })

    const getLogo = async () => {
        await axios
            .get(api + '?type=LOGO&hide=false&qty=1')
            .then(res => {
                const data = res.data
                setLogoData(data)
            })
            .catch(err => console.log(err))
    }

    useMount(() => {
        getLogo()
    })

    const content = (
        <div>
            <div className={styles.content}>
                <Link to='/orders'>
                    <i class='fas fa-dice-d6'/>
                    Đơn hàng
                </Link>
                <Link to='/cart'>
                    <i class='fas fa-chart-area'/>
                    Giỏ hàng
                </Link>
            </div>
        </div>
    )

    return (
        <>
            <header>
                <Row className={styles.container}>
                    <Col
                        className={styles.logo}
                        xl={{
                            order: 1,
                            span: 3,
                        }}
                        lg={{
                            order: 1,
                            span: 3,
                        }}
                        md={{
                            order: 1,
                            span: 3,
                        }}
                        sm={{
                            order: 1,
                            span: 8,
                        }}
                        xs={{
                            order: 1,
                            span: 8,
                        }}
                    >
                        {logoData?.map(logo => (
                            <Link to='/'>
                                <img
                                    src={logo.image}
                                    alt='logo'
                                />
                            </Link>
                        ))}
                    </Col>
                    <Col
                        className={styles.search}
                        xl={{
                            order: 2,
                            span: 15,
                        }}
                        lg={{
                            order: 2,
                            span: 15,
                        }}
                        md={{
                            order: 2,
                            span: 13,
                        }}
                        sm={{
                            order: 4,
                            span: 24,
                        }}
                        xs={{
                            order: 4,
                            span: 24,
                        }}
                    >
                        <SearchDebounce />
                    </Col>
                    <Col
                        className={styles.user}
                        xl={{
                            order: 3,
                            span: 3,
                        }}
                        lg={{
                            order: 3,
                            span: 3,
                        }}
                        md={{
                            order: 3,
                            span: 4,
                        }}
                        sm={{
                            order: 3,
                            span: 8,
                        }}
                        xs={{
                            order: 3,
                            span: 8,
                        }}
                    >
                        {!token && (
                            <Link to='/login'>
                                <UserOutlined />
                                <div>
                                    <p>Đăng nhập</p>
                                    <h4>Tài khoản</h4>
                                </div>
                            </Link>
                        )}
                        {token && <LoginSuccessful />}
                    </Col>
                    <Col
                        className={styles.cart}
                        xl={{
                            order: 3,
                            span: 3,
                        }}
                        lg={{
                            order: 3,
                            span: 3,
                        }}
                        md={{
                            order: 4,
                            span: 4,
                        }}
                        sm={{
                            order: 3,
                            span: 8,
                        }}
                        xs={{
                            order: 3,
                            span: 8,
                        }}
                    >
                        <Popover content={content}>
                            <NavLink
                                className='cart_content'
                                to='/cart'
                            >
                                <div
                                    className={styles.icon}
                                >
                                    <ShoppingCartOutlined />
                                    <span
                                        className={
                                            styles.count
                                        }
                                    >
                                        {props.numberCart}
                                    </span>
                                </div>
                                <div>
                                    <p>Giỏ hàng</p>
                                    <h4>
                                        {formatCash(
                                            TotalCart
                                        )}
                                    </h4>
                                </div>
                            </NavLink>
                        </Popover>
                    </Col>
                    <Col
                        xl={24}
                        lg={24}
                        md={24}
                        sm={{
                            order: 5,
                            span: 24,
                        }}
                        xs={{
                            order: 5,
                            span: 24,
                        }}
                    >
                        <Navigation />
                    </Col>
                </Row>
                <BackTop
                    visibilityHeight={200}
                    className={styles.backtop}
                >
                    <div>
                        <i class='fas fa-arrow-up'/>
                    </div>
                </BackTop>
            </header>
        </>
    )
}

const mapStateToProps = state => {
    return {
        numberCart: state._todoProduct.numberCart,
        items: state._todoProduct,
    }
}

export default connect(mapStateToProps, null)(Header)

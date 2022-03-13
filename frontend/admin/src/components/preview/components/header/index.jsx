import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, BackTop, Popover } from 'antd'
import {
    UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import {
    formatCash,
    discount,
} from '../../../../public/function'
import Navigation from './Navigation'
import SearchDebounce from '../../source/search/handleSearch'
import { layoutContext } from '../../../../pages/layout'
import './Navigation/navigation.less'
import styles from './header.module.less'

const Header = props => {
    const context = useContext(layoutContext)

    let TotalCart = 0

    Object.keys(props.items.Carts).forEach(function (item) {
        TotalCart +=
            props.items.Carts[item].quantity *
            discount(
                props.items.Carts[item].price,
                props.items.Carts[item].discount
            )
    })

    const content = (
        <div>
            <div className={styles.content}>
                <div>
                    <i class='fas fa-dice-d6'/>
                    Đơn hàng
                </div>
                <div>
                    <i class='fas fa-chart-area'/>
                    Giỏ hàng
                </div>
            </div>
        </div>
    )

    return (
        <>
            <header>
                <Row className={styles.container}>
                    <Col
                        className={styles.logo}
                        xl={{ order: 1, span: 3 }}
                        lg={{ order: 1, span: 3 }}
                        md={{ order: 1, span: 3 }}
                        sm={{ order: 1, span: 8 }}
                        xs={{ order: 1, span: 8 }}
                    >
                        <Link to='/'>
                            {context.logoData?.map(logo => (
                                <img
                                    src={logo.image}
                                    alt='logo'
                                />
                            ))}
                        </Link>
                    </Col>
                    <Col
                        className={styles.search}
                        xl={{ order: 2, span: 15 }}
                        lg={{ order: 2, span: 15 }}
                        md={{ order: 2, span: 13 }}
                        sm={{ order: 4, span: 24 }}
                        xs={{ order: 4, span: 24 }}
                    >
                        <SearchDebounce />
                    </Col>
                    <Col
                        className={styles.user}
                        xl={{ order: 3, span: 3 }}
                        lg={{ order: 3, span: 3 }}
                        md={{ order: 3, span: 4 }}
                        sm={{ order: 3, span: 8 }}
                        xs={{ order: 3, span: 8 }}
                    >
                        <div>
                            <UserOutlined />
                            <div>
                                <p>Đăng nhập</p>
                                <h4>Tài khoản</h4>
                            </div>
                        </div>
                    </Col>
                    <Col
                        className={styles.cart}
                        xl={{ order: 3, span: 3 }}
                        lg={{ order: 3, span: 3 }}
                        md={{ order: 4, span: 4 }}
                        sm={{ order: 3, span: 8 }}
                        xs={{ order: 3, span: 8 }}
                    >
                        <Popover content={content}>
                            <div className='cart_content'>
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
                            </div>
                        </Popover>
                    </Col>
                    <Col
                        xl={24}
                        lg={24}
                        md={24}
                        sm={{ order: 5, span: 24 }}
                        xs={{ order: 5, span: 24 }}
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

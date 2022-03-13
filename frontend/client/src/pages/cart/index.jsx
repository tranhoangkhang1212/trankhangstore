import React, { useState } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {
    IncreaseQuantity,
    DecreaseQuantity,
    DeleteCart,
} from '../../redux/actions'
import { formatCash, discount } from '../../public/function'
import { Row, Col, Button, Popconfirm } from 'antd'
import Title from './title'
import OrderNow from './orderNow'
import styles from './cart.module.less'

// Payment
const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/user/order/create'

const Cart = ({
    items,
    IncreaseQuantity,
    DecreaseQuantity,
    DeleteCart,
}) => {
    let ListCart = []
    let TotalCart = 0
    let totalQty = 0
    let output = {}
    let products = []

    const [visible, setVisible] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const token = Cookies.get('token')
    const getToken = () => {
        if (token) {
            return jwt_decode(token)
        } else {
            return
        }
    }

    Object.keys(items.Carts).forEach(function (item) {
        totalQty += items.Carts[item].quantity
        TotalCart +=
            items.Carts[item].quantity *
            discount(
                items.Carts[item].price,
                items.Carts[item].discount
            )
        ListCart.push(items.Carts[item])
    })

    function TotalPrice(price, total) {
        return Number(price * total)
    }

    const empty = () => {
        if (ListCart.length <= 0) {
            return true
        } else {
            return false
        }
    }

    // Output to API
    ListCart.map(item =>
        products.push({
            id: item.id,
            qty: item.quantity,
            name: item.name,
            image: item.image,
            price: discount(item.price, item.discount),
        })
    )

    const profile = getToken()

    if (token) {
        output = {
            customerName: profile.full_name,
            address: profile.address,
            phoneNumber: profile.phone_number,
            products: products,
            total: TotalCart,
        }
    }

    const payMent = async () => {
        setLoading(true)
        await axios
            .post(api, output)
            .then(
                () => (window.location.pathname = '/orders')
            )
            .catch(err => console.log(err.response.status))
            .finally(() => setLoading(false))
    }

    const handleOrder = () => {
        if (token) {
            payMent()
        } else {
            setVisible(true)
        }
    }

    const text = 'Bạn chắc chắn muốn xóa sản phẩm ?'

    const hanldeConfirmDelete = key => {
        DeleteCart(key)
    }

    return (
        <div className={styles.cart}>
            {!token && (
                <OrderNow
                    TotalCart={TotalCart}
                    totalQty={totalQty}
                    ListCart={ListCart}
                    visible={visible}
                    setDisabled={setDisabled}
                    setVisible={setVisible}
                />
            )}
            {!empty() && <Title />}
            {empty() && (
                <div className={styles.empty_cart}>
                    <img
                        src='https://i.ibb.co/Jkzssfc/cart-empty-background.png'
                        alt='Cart empty'
                    />
                    <p>
                        Không có sản phẩm nào trong giỏ hàng
                    </p>
                    <a href='/'>Mua sắm ngay</a>
                </div>
            )}
            {loading === false &&
                ListCart.map((item, key) => (
                    <Row
                        key={key}
                        className={styles.container}
                        align='middle'
                    >
                        <Col className={styles.item} xl={4}>
                            <p>{item.name}</p>
                        </Col>
                        <Col className={styles.item} xl={4}>
                            <img
                                src={item.image}
                                alt={item.name}
                            />
                        </Col>
                        <Col className={styles.item} xl={4}>
                            <div className={styles.qty}>
                                <button
                                    onClick={() =>
                                        DecreaseQuantity(
                                            key
                                        )
                                    }
                                >
                                    <i class='fas fa-minus'/>
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        IncreaseQuantity(
                                            key
                                        )
                                    }
                                >
                                    <i class='fas fa-plus'/>
                                </button>
                            </div>
                        </Col>
                        <Col className={styles.item} xl={4}>
                            <span>
                                {formatCash(
                                    discount(
                                        item.price,
                                        item.discount
                                    )
                                )}
                            </span>
                        </Col>
                        <Col className={styles.item} xl={4}>
                            <span>
                                {formatCash(
                                    TotalPrice(
                                        discount(
                                            item.price,
                                            item.discount
                                        ),
                                        item.quantity
                                    )
                                )}
                            </span>
                        </Col>
                        <Col className={styles.item} xl={4}>
                            <div className={styles.delete}>
                                <Popconfirm
                                    placement='topRight'
                                    title={text}
                                    onConfirm={() =>
                                        hanldeConfirmDelete(
                                            key
                                        )
                                    }
                                    okText='Yes'
                                    cancelText='No'
                                >
                                    <Button type='primary'>
                                        Xóa
                                    </Button>
                                </Popconfirm>
                            </div>
                        </Col>
                    </Row>
                ))}
            {!empty() && loading === false && (
                <div className={styles.bottom}>
                    <div className={styles.total}>
                        <h3>Tổng tiền: </h3>
                        <span>
                            {formatCash(TotalCart)}đ
                        </span>
                    </div>
                    <Button
                        loading={loading}
                        size='large'
                        className={styles.payment}
                        type='primary'
                        onClick={handleOrder}
                        disabled={disabled}
                    >
                        Đặt hàng
                    </Button>
                </div>
            )}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        items: state._todoProduct,
    }
}

export default connect(mapStateToProps, {
    IncreaseQuantity,
    DecreaseQuantity,
    DeleteCart,
})(Cart)

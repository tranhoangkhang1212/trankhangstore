import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import { formatCash } from '../../public/function'
import { useMount } from 'ahooks'
import {
    Row,
    Col,
    Button,
    Popconfirm,
    Spin,
    Modal,
    Input,
    message,
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './orders.module.less'
import Title from './title'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/user/order/'
const apiDel = apiUrl + '/api/user/order/delete/'
const apiUpdate = apiUrl + '/api/user/order/update-type/'

const token = Cookies.get('token')
const getToken = () => {
    if (token) {
        return jwt_decode(token)
    } else {
        return token
    }
}

const text = 'Bạn chắn chắn muốn hủy đơn hàng?'
let i = 1
let idOrder

const Orders = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState()
    const [visible, setVisible] = useState(false)
    let phoneNumber = 0

    const getOrders = async () => {
        setLoading(true)
        await axios
            .get(
                api +
                    `phone=${
                        token
                            ? getToken().phone_number
                            : phoneNumber
                    }`
            )
            .then(res => {
                const data = res.data
                setOrders(data)
            })
            .catch(() =>
                message.error('Không tìm thấy đơn hàng!')
            )
            .finally(() => {
                setLoading(false)
                setVisible(false)
            })
    }

    const deleteOrders = async () => {
        setLoading(true)
        await axios
            .delete(apiDel + `id=${idOrder}`)
            .then(res => {
                const data = res.data
                setOrders(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const updateType = async () => {
        setLoading(true)
        await axios
            .patch(apiUpdate + `id=${idOrder}`)
            .then(res => {
                const data = res.data
                setOrders(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getOrders()
    })

    const empty = () => {
        if (orders === undefined) {
            return true
        } else {
            return false
        }
    }

    const hanldeConfirmCancel = () => {
        deleteOrders()
        getOrders()
    }

    window.onbeforeunload = () => {
        sessionStorage.clear()
    }

    const checkPayment = status => {
        if (status === 'true') {
            return {
                status: true,
                text: 'Đã xác nhận',
            }
        } else {
            return {
                status: false,
                text: 'Chờ xác nhận',
            }
        }
    }

    const payment = () => {
        updateType()
        window.location.reload()
    }

    const handelInputChange = e => {
        phoneNumber = e.target.value
    }

    return (
        <div className={styles.orders}>
            <Modal
                title='Nhập số điên thoại để tìm kiếm'
                className={styles.modal}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button
                        loading={loading}
                        className={styles.search}
                        type='primary'
                        onClick={getOrders}
                    >
                        Tìm kiếm
                    </Button>,
                ]}
            >
                <div className={styles.modal_content}>
                    <Input
                        placeholder='Số điện thoại'
                        onChange={handelInputChange}
                    />
                </div>
            </Modal>
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
            {empty() && (
                <div className={styles.empty_cart}>
                    <img
                        src='https://i.ibb.co/Jp6XGTB/cart-empty-background.png'
                        alt='Cart empty'
                    />
                    <p>Bạn không có đơn hàng nào</p>
                    {!token && (
                        <>
                            <Button
                                onClick={() =>
                                    setVisible(true)
                                }
                                className={
                                    styles.search_order
                                }
                                type='primary'
                            >
                                Tìm kiếm đơn hàng
                            </Button>
                            <span className={styles.or}>
                                Hoặc
                            </span>
                        </>
                    )}
                    <a href='/'>Mua sắm ngay</a>
                </div>
            )}
            {loading === false &&
                orders?.map(item => (
                    <div className={styles.container}>
                        <div className={styles.top}>
                            <div>
                                <h2>Đơn hàng: {i++}</h2>
                                <p
                                    className={
                                        styles.status
                                    }
                                >
                                    Trạng thái:{' '}
                                    <span
                                        style={{
                                            color: checkPayment(
                                                item.payment
                                            ).status
                                                ? 'rgb(27, 223, 27)'
                                                : 'red',
                                        }}
                                    >
                                        {
                                            checkPayment(
                                                item.payment
                                            ).text
                                        }
                                    </span>
                                </p>
                            </div>
                            <Popconfirm
                                placement='topLeft'
                                title={text}
                                onConfirm={
                                    hanldeConfirmCancel
                                }
                                okText='Yes'
                                cancelText='No'
                            >
                                <Button
                                    type='primary'
                                    className={
                                        styles.cancel
                                    }
                                >
                                    Hủy đơn hàng
                                </Button>
                            </Popconfirm>
                        </div>
                        {!empty() && <Title />}
                        {item.products?.map(product => (
                            <Row
                                align='middle'
                                className={
                                    styles.orders_content
                                }
                            >
                                <Col
                                    className={styles.item}
                                    xl={5}
                                >
                                    <span>
                                        {product.name}
                                    </span>
                                </Col>
                                <Col
                                    className={styles.item}
                                    xl={5}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </Col>
                                <Col
                                    className={styles.item}
                                    xl={4}
                                >
                                    <span>
                                        {product.qty}
                                    </span>
                                </Col>
                                <Col
                                    className={styles.item}
                                    xl={5}
                                >
                                    <span>
                                        {formatCash(
                                            product.price
                                        )}
                                    </span>
                                </Col>
                                <Col
                                    className={styles.item}
                                    xl={5}
                                >
                                    <span>
                                        {formatCash(
                                            product.price *
                                                product.qty
                                        )}
                                    </span>
                                </Col>
                            </Row>
                        ))}
                        <div
                            style={{
                                display: 'none',
                            }}
                        >
                            {(idOrder = item.id)}
                        </div>
                        <div className={styles.bottom}>
                            <div>
                                <h3>
                                    Tổng tiền:{' '}
                                    <span>
                                        {formatCash(
                                            item.total
                                        )}
                                    </span>
                                </h3>
                                <h4>
                                    Ngày tạo: {item.created}
                                </h4>
                            </div>
                            <div>
                                {!checkPayment(item.payment)
                                    .status && (
                                    <Button
                                        onClick={payment}
                                    >
                                        Đặt hàng
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Orders

import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import {
    formatCash,
    discount,
} from '../../../public/function'
import styles from './order.module.less'

// Payment
const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/user/order/create'

const OrderNow = props => {
    const [state, setState] = useState({
        customerName: '',
        address: '',
        phoneNumber: '',
    })
    const [loading, setLoading] = useState(false)

    let products = []
    let output = {}

    const handleChange = e => {
        const value = e.target.value
        setState({
            ...state,
            [e.target.name]: value,
        })
    }

    props.ListCart.map(item =>
        products.push({
            id: item.id,
            qty: item.quantity,
            name: item.name,
            image: item.image,
            price: discount(item.price, item.discount),
        })
    )

    output = {
        ...state,
        total: props.TotalCart,
        products: products,
        totalQty: props.totalQty,
    }

    const payMent = async () => {
        setLoading(true)
        await axios
            .post(api, output)
            .catch(err =>
                message.error('Vui lòng thử lại!')
            )
            .finally(() => {
                setLoading(false)
                props.setDisabled(true)
            })
    }

    const onFinish = () => {
        payMent()
        message.success('Đặt hàng thành công')
        props.setVisible(false)
    }

    return (
        <div>
            <Modal
                className={styles.container}
                title='Đặt hàng nhanh'
                visible={props.visible}
                onOk={() => props.setVisible(false)}
                onCancel={() => props.setVisible(false)}
                footer={[]}
            >
                <div className={styles.products_content}>
                    <div className={styles.product_items}>
                        {props.ListCart.map(item => (
                            <div
                                key={item.id}
                                className={styles.product}
                            >
                                <div
                                    className={
                                        styles.content
                                    }
                                >
                                    <div>
                                        <h3>{item.name}</h3>
                                        <span>
                                            {formatCash(
                                                discount(
                                                    item.price,
                                                    item.discount
                                                )
                                            )}
                                        </span>
                                    </div>
                                    <div>
                                        x {item.quantity}
                                    </div>
                                    <div>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className={styles.total}>
                            <h3>Tổng tiền</h3>
                            <span>
                                {formatCash(
                                    props.TotalCart
                                )}
                                đ
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2>Thông tin khách hàng</h2>
                        <Form
                            className={styles.form}
                            layout='vertical'
                            name='payment'
                            onFinish={onFinish}
                            autoComplete='off'
                        >
                            <Form.Item
                                label='Họ và Tên'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập đầy đủ họ tên!',
                                    },
                                ]}
                            >
                                <Input
                                    name='customerName'
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label='Số điện thoại'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your password!',
                                    },
                                ]}
                            >
                                <Input
                                    name='phoneNumber'
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label='Địa chỉ'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <Input
                                    name='address'
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    loading={loading}
                                    type='primary'
                                    htmlType='submit'
                                >
                                    Xác nhận
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default OrderNow

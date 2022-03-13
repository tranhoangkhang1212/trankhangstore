import React, { useState } from 'react'
import { useMount } from 'ahooks'
import axios from 'axios'
import { Table, Empty, Button, message } from 'antd'
import { formatCash } from '../../../public/function'
import Detail from '../detail'
import styles from './list_order.module.less'
import './list_order.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/user/order/all'
const apiGetByID = apiUrl + '/api/user/order/'
const apiDelete = apiUrl + '/api/user/order/delete/'

const { Column } = Table

const ListOrder = () => {
    const [loading, setLoading] = useState(false)
    const [detailLoading, setDetailLoading] =
        useState(false)
    const [visible, setVisible] = useState({
        status: false,
        orderId: '',
    })
    const [orderData, setOrderData] = useState([])
    const [detailOrder, setDetailOrder] = useState([])

    const getOrderData = async () => {
        setLoading(true)
        await axios
            .get(api)
            .then(res => {
                const data = res.data
                setOrderData(data)
            })
            .finally(() => setLoading(false))
    }

    const getOrderById = async id => {
        setDetailLoading(true)
        await axios
            .get(apiGetByID + `id=${id}`)
            .then(res => {
                const data = res.data
                setDetailOrder(data)
            })
            .finally(() => setDetailLoading(false))
    }

    const deleteOrder = id => {
        axios
            .delete(apiDelete + `id=${id}`)
            .then(() => {
                message.success('Xóa đơn hàng thành công')
                getOrderData()
            })
            .catch(() => message.error('Vui lòng thử lại'))
    }

    useMount(() => {
        getOrderData()
    })

    const handleGetOrdeDetail = id => {
        setVisible({
            ...visible,
            status: true,
            id: id,
        })
        getOrderById(id)
    }

    return (
        <div>
            {orderData === undefined && <Empty />}
            <Table dataSource={orderData} loading={loading}>
                <Column
                    title='Mã đơn hàng'
                    key='id'
                    render={order => (
                        <span>#{order.id}</span>
                    )}
                />
                <Column
                    title='Họ tên'
                    dataIndex='customerName'
                    key='customerName'
                />
                <Column
                    title='Số điện thoại'
                    dataIndex='phoneNumber'
                    key='phoneNumber'
                />
                <Column
                    width={300}
                    title='Địa chỉ'
                    dataIndex='address'
                    key='address'
                />
                <Column
                    align='center'
                    title='Số lượng'
                    dataIndex='totalQty'
                    key='totalQty'
                />
                <Column
                    title='Tổng tiền'
                    key='total'
                    render={order => (
                        <span className={styles.total}>
                            {formatCash(order.total)}
                        </span>
                    )}
                />
                <Column
                    title='Chi tiết'
                    key='detail'
                    render={order => (
                        <>
                            <Button
                                type='primary'
                                onClick={() =>
                                    handleGetOrdeDetail(
                                        order.id
                                    )
                                }
                                className={
                                    styles.detail_button
                                }
                            >
                                Chi tiết
                            </Button>
                            <Button
                                type='primary'
                                onClick={() =>
                                    deleteOrder(order.id)
                                }
                                className={
                                    styles.delete_button
                                }
                            >
                                Xóa
                            </Button>
                        </>
                    )}
                />
            </Table>
            <Detail
                visible={visible}
                setVisible={setVisible}
                data={detailOrder}
                loading={detailLoading}
            />
        </div>
    )
}

export default ListOrder

import React from 'react'
import { Modal, Table } from 'antd'
import { formatCash } from '../../../public/function'
import './detail.less'
import styles from './detail.module.less'

const { Column } = Table

const Detail = props => {
    return (
        <>
            <Modal
                destroyOnClose
                width={700}
                visible={props.visible.status}
                onCancel={() =>
                    props.setVisible({
                        ...props.visible,
                        status: false,
                    })
                }
                title={
                    'Chi tiết đơn hàng #' + props.visible.id
                }
                footer={[]}
            >
                {props.loading === false &&
                    props.data.map(orders => (
                        <div>
                            <Table
                                dataSource={orders.products}
                                pagination={false}
                                loading={props.loading}
                                className={styles.detail}
                            >
                                <Column
                                    title='Tên'
                                    key='name'
                                    dataIndex='name'
                                />
                                <Column
                                    title='Hình ảnh'
                                    key='image'
                                    render={product => (
                                        <>
                                            <img
                                                src={
                                                    product.image
                                                }
                                                alt=''
                                            />
                                        </>
                                    )}
                                />
                                <Column
                                    title='Số lượng'
                                    key='qty'
                                    dataIndex='qty'
                                />
                                <Column
                                    title='Đơn giá'
                                    key='price'
                                    render={product => (
                                        <>
                                            <span>
                                                {formatCash(
                                                    product.price
                                                )}
                                            </span>
                                        </>
                                    )}
                                />
                                <Column
                                    title='Tổng'
                                    key='total'
                                    render={product => (
                                        <>
                                            <span>
                                                {formatCash(
                                                    product.price *
                                                        product.qty
                                                )}
                                            </span>
                                        </>
                                    )}
                                />
                            </Table>
                        </div>
                    ))}
            </Modal>
        </>
    )
}

export default Detail

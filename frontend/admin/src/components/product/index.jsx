import React, { useState } from 'react'
import axios from 'axios'
import { Rate, Button, message, Popconfirm } from 'antd'
import moment from 'moment'
import { formatCash, discount } from '../../public/function'
import styles from './product.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/delete?id='

const Products = ({ data, reCall }) => {
    const [loading, setLoading] = useState(false)

    const deleteProduct = async id => {
        setLoading(true)
        await axios
            .delete(api + id)
            .catch(() => message.error('Vui lòng thử lại!'))
            .finally(() => {
                setLoading(false)
                reCall()
                message.success('Xóa sản phẩm thành công')
            })
    }

    return (
        <div className={styles.product}>
            <img src={data.imageUrl} alt={data.name} />
            <div className={styles.product_content}>
                <div>{data.name}</div>
                <div
                    className={styles.discount}
                    style={{
                        display:
                            parseInt(data.discount) > 0
                                ? 'block'
                                : 'none',
                    }}
                >
                    <p
                        style={{
                            textDecoration: 'line-through',
                        }}
                    >
                        {formatCash(data.price)}
                    </p>
                    <span> -{data.discount}%</span>
                </div>
                <h3>
                    {formatCash(
                        discount(data.price, data.discount)
                    )}
                </h3>
                <Rate
                    className={styles.rate}
                    value={parseFloat(data.rate)}
                    allowHalf={true}
                    disabled
                />
                <div className={styles.created}>
                    <span>
                        Ngày khởi tạo:{' '}
                        {moment(data.created).format(
                            'DD-MM-YYYY, HH:mm'
                        )}
                    </span>
                </div>
            </div>
            <Button
                className={styles.update_btn}
                href={'/product/update/' + data.id}
                type='primary'
            >
                Cập nhật
            </Button>
            <div className={styles.delete_btn}>
                <Popconfirm
                    placement='topRight'
                    title='Bạn có chắn chắn muốn xóa sản phẩm?'
                    onConfirm={() => deleteProduct(data.id)}
                    okText='Xóa'
                    cancelText='Hủy'
                >
                    <Button loading={loading}>
                        <i class='far fa-times-circle'/>
                    </Button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default Products

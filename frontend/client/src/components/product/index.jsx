import React from 'react'
import { Link } from 'react-router-dom'
import { Rate } from 'antd'
import { formatCash, discount } from '../../public/function'
import styles from './product.module.less'

const Products = ({ data }) => {
    return (
        <div className={styles.product}>
            <img src={data.imageUrl} alt={data.name} />
            <div className={styles.product_content}>
                <Link to={`/product/details/${data.id}`}>
                    {data.name}
                </Link>
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
            </div>
        </div>
    )
}

export default Products

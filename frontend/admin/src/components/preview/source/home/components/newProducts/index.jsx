import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Product from '../../../../components/product'
import styles from './main_products.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/new'

const NewProducts = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setLoading(true)
        await axios
            .get(api)
            .then(res => {
                const data = res.data
                setProducts(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className={styles.container}>
            <Spin
                spinning={loading}
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                indicator={
                    <LoadingOutlined
                        style={{ fontSize: 28 }}
                        spin
                    />
                }
            />

            {loading === false && (
                <>
                    <img
                        src='https://i.ibb.co/9qTG4sx/partner.jpg'
                        alt='Cộng tác viên'
                    />
                    <div
                        className={styles.products_section}
                    >
                        <div className={styles.title}>
                            <h2>Sản phẩm mới nhất</h2>
                        </div>
                        <Row>
                            {products.map((item, key) => (
                                <Col
                                    className={
                                        styles.product
                                    }
                                    key={key}
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <Product data={item} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            )}
        </div>
    )
}

export default NewProducts

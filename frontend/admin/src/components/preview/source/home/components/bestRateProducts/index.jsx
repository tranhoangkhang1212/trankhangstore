import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Product from '../../../../components/product'
import styles from './main_products.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/rate'

const BestRateProducts = () => {
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
                <div className={styles.products_section}>
                    <div className={styles.title}>
                        <h2>
                            Sản phẩm được đánh giá tốt nhất
                        </h2>
                    </div>
                    <Row>
                        {products.map((item, key) => (
                            <Col
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
            )}
        </div>
    )
}

export default BestRateProducts

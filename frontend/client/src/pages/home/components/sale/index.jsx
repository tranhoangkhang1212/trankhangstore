import React, { useState, useEffect } from 'react'
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Product from '../../../../components/product'
import styles from './sale.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/sale'

const Sale = () => {
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

    const [countDown, setCountDown] = useState()

    setInterval(function time() {
        const d = new Date()
        const hours = 24 - d.getHours()
        let min = 60 - d.getMinutes()
        if ((min + '').length === 1) {
            min = '0' + min
        }
        let sec = 60 - d.getSeconds()
        if ((sec + '').length === 1) {
            sec = '0' + sec
        }
        setCountDown(hours + ':' + min + ':' + sec)
    }, 1000)

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
                        style={{
                            fontSize: 28,
                        }}
                        spin
                    />
                }
            />

            {loading === false && (
                <>
                    <div className={styles.title}>
                        <h1>Săn sale online mỗi ngày</h1>
                        <h2>{countDown}</h2>
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
                </>
            )}
        </div>
    )
}

export default Sale

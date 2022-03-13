import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Empty, List, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Product from '../../components/product'
import styles from './search.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/search'

const Search = () => {
    const [loading, setLoading] = useState(false)
    const { params } = useParams()
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setLoading(true)
        await axios
            .get(api + `?q=${params}`)
            .then(res => {
                const data = res.data
                setProducts(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    const empty = () => {
        if (products.length <= 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className={styles.search}>
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

            {empty() && (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            )}
            {!empty() && loading === false && (
                <>
                    <h2>
                        Có {products.length} sản phẩm được
                        tìm thấy
                    </h2>
                    <List
                        pagination={{
                            pageSize: 16,
                        }}
                        grid={{
                            xl: 4,
                            lg: 4,
                            md: 2,
                            sm: 2,
                            xs: 2,
                        }}
                        dataSource={products}
                        renderItem={item => (
                            <Product data={item} />
                        )}
                    />
                </>
            )}
        </div>
    )
}

export default Search

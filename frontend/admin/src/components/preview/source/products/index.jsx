import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './products.module.less'
import Product from '../../components/product'

const apiUrl = process.env.REACT_APP_API_URL
const apiProducts = apiUrl + '/api/products/all'
const apiBrands = apiUrl + '/api/brands/all'

const Products = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])

    const getBrands = async () => {
        setLoading(true)
        await axios
            .get(apiBrands)
            .then(res => {
                const data = res.data
                setBrands(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const getProducts = async () => {
        setLoading(true)
        await axios
            .get(apiProducts)
            .then(res => {
                const data = res.data
                setProducts(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getProducts()
        getBrands()
    }, [])

    const handleClickBrand = brand => {
        const apiSearch =
            apiUrl + `/api/products/brand?q=${brand}`
        ;(async function getProducts() {
            setLoading(true)
            await axios
                .get(apiSearch)
                .then(res => {
                    const data = res.data
                    setProducts(data)
                })
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
        })()
    }

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
                    <div className={styles.brands}>
                        {brands.map((brand, key) => (
                            <div key={key}>
                                <img
                                    className={
                                        styles.active
                                    }
                                    src={brand.image}
                                    alt={brand.name}
                                    onClick={() =>
                                        handleClickBrand(
                                            brand.name
                                        )
                                    }
                                    onDoubleClick={() =>
                                        getProducts()
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <List
                        pagination={{
                            pageSize: 16,
                        }}
                        grid={{
                            xl: 4,
                            lg: 4,
                            md: 3,
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

export default Products

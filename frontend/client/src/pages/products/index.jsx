import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { List, Spin, Radio } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './products.module.less'
import Product from '../../components/product'
import Carousel from './slider'

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

    useEffect(() => {
        getProducts()
        getBrands()
    }, [])

    const sortNameAsc = () => {
        setProducts(
            [...products].sort(function (a, b) {
                return a.name.localeCompare(b.name)
            })
        )
    }

    const sortNameDesc = () => {
        setProducts(
            [...products].sort(function (a, b) {
                return -a.price.localeCompare(b.price)
            })
        )
    }

    const sortPriceAsc = () => {
        const sort = [...products].sort(function (a, b) {
            return a.price.localeCompare(b.price)
        })
        setProducts(sort)
    }

    const sortPriceDesc = () => {
        const sort = [...products].sort(function (a, b) {
            return -a.price.localeCompare(b.price)
        })
        setProducts(sort)
    }

    const sortByRating = () => {
        const sort = [...products].sort(function (a, b) {
            return a.rate.localeCompare(b.rate)
        })
        setProducts(sort)
    }

    return (
        <div className={styles.container}>
            <Carousel />
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
            <div className={styles.sort}>
                <div className={styles.sort_title}>
                    <i class='fas fa-sort'/>
                    <span>Sắp xếp</span>
                </div>
                <Radio.Group>
                    <Radio value={1} onClick={sortNameAsc}>
                        Tên A-Z
                    </Radio>
                    <Radio value={2} onClick={sortNameDesc}>
                        Tên Z-A
                    </Radio>
                    <Radio value={3} onClick={sortPriceAsc}>
                        Giá tăng dần
                    </Radio>
                    <Radio
                        value={4}
                        onClick={sortPriceDesc}
                    >
                        Giá giảm dần
                    </Radio>
                    <Radio value={5} onClick={sortByRating}>
                        Đánh giá
                    </Radio>
                </Radio.Group>
            </div>
            {loading === false && (
                <>
                    <div className={styles.brands}>
                        {brands.map((brand, key) => (
                            <Link
                                key={key}
                                to={`/products/${brand.name}`}
                            >
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
                            </Link>
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

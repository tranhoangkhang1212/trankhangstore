import React, { useState } from 'react'
import axios from 'axios'
import { useMount } from 'ahooks'
import Product from '../../../../components/product'
import { List } from 'antd'
import styles from './suggest.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/brand'

const Suggest = (props) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setLoading(true)
        await axios
            .get(api + `?q=${props.brandID}&id=${props.id}`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getProducts()
    })

    return (
        <div className={styles.container}>
            <h2>Sản phẩm gợi ý cho bạn</h2>
            {loading === false && (
                <List
                    pagination={false}
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
            )}
        </div>
    )
}

export default Suggest

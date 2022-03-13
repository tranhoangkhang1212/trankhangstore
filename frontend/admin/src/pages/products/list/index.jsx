import React, { useState } from 'react'
import axios from 'axios'
import { useMount } from 'ahooks'
import { List } from 'antd'
import Product from '../../../components/product'
import './list.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/all'

const ListProducts = () => {
    const [loading, setLoading] = useState(false)
    const [productsData, setProductsData] = useState([])

    const getProductsData = async () => {
        setLoading(true)
        await axios
            .get(api)
            .then(res => {
                const data = res.data
                setProductsData(data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getProductsData()
    })

    return (
        <>
            <List
                loading={loading}
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
                dataSource={productsData}
                renderItem={item => (
                    <Product
                        reCall={() => getProductsData()}
                        data={item}
                    />
                )}
            />
        </>
    )
}

export default ListProducts

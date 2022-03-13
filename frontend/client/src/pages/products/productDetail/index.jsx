import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMount } from 'ahooks'
import axios from 'axios'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Intro from './intro'
import Specifications from './specifications'
import Suggest from './suggest'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/'

const ProductDetail = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [productDetailData, setProductDetailData] =
        useState([])

    const getProductDetailData = async () => {
        setLoading(true)
        await axios
            .get(api + `${id}`)
            .then(res => {
                const data = res.data
                setProductDetailData(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getProductDetailData()
    })

    return (
        <>
            <Spin
                spinning={loading}
                style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '12px',
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
            {loading === false &&
                productDetailData.map(data => (
                    <>
                        <Intro data={data} />
                        <Specifications data={data} />
                        <Suggest id={id} brandID={data.brandID} />
                    </>
                ))}
        </>
    )
}

export default ProductDetail

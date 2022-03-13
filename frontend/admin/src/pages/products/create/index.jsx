import React, { useState } from 'react'
import { Button, Row, Col, message } from 'antd'
import axios from 'axios'
import { useMount } from 'ahooks'
import ImageUpload from '../../../components/imageUpload'
import Base from './base'
import Detail from './detail'
import styles from './create.module.less'

const key = process.env.REACT_APP_IMGBB_API_KEY
const imgbbUploader = require('imgbb-uploader')

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/create'
const apiGetProductsNoDetail =
    apiUrl + '/api/products/no-details'

const Create = () => {
    let base64
    const [disabled, setDisabled] = useState(true)
    const [detailDisabled, setDetailDisabled] =
        useState(true)
    const [image, setImage] = useState([])
    const [data, setData] = useState()
    const [products, setProducts] = useState([])
    const [productData, setProductData] = useState({
        brandId: '',
        name: '',
        price: '',
        discount: '',
        imageUrl: '',
    })
    const [loading, setLoading] = useState(false)
    const [createLoading, setCreateLoading] =
        useState(false)

    const base64str = () =>
        new Promise(resolve => {
            return setTimeout(() => {
                resolve(base64)
            }, 1000)
        })

    // Barebone async function
    const myUrl = async name => {
        setLoading(true)
        return await imgbbUploader({
            apiKey: key,
            base64string: await base64str(),
            name: name,
        })
            .then(res => {
                setProductData({
                    ...productData,
                    imageUrl: res.url,
                })
                message.success('Tải ảnh lên thành công')
            })
            .catch(() => {
                message.error('Tải ảnh lên thất bại!')
            })
            .finally(() => {
                setLoading(false)
                setDisabled(false)
            })
    }

    const handleUpload = () => {
        myUrl(data.file.name)
        let output
        const pegs = data.data_url.indexOf('base64,')
        output = data.data_url.slice(0, pegs + 7)
        base64 = data.data_url.replace(output, '')
    }

    const getProductNoDetails = async () => {
        setLoading(true)
        await axios
            .get(apiGetProductsNoDetail)
            .then(res => {
                const data = res.data
                setProducts(data)
            })
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getProductNoDetails()
    })

    const createProduct = () => {
        setCreateLoading(true)
        axios
            .post(api, productData)
            .then(() => {
                message.success('Tạo sản phâm thành công')                
            }
            )
            .catch(() =>
                message.error('Tạo sản phẩm thất bại!')
            )
            .finally(() => {
                setDetailDisabled(false)
                getProductNoDetails()
                setCreateLoading(false)
            })
    }

    return (
        <div className={styles.container}>
            <Row>
                <Col
                    className={styles.product_base}
                    xl={12}
                >
                    <Base
                        productData={productData}
                        setProductData={setProductData}
                    />
                    <p className={styles.title}>Hình ảnh</p>
                    <ImageUpload
                        buttonName='Tải lên'
                        loading={loading}
                        onClick={() => handleUpload()}
                        className={styles.upload_image}
                        image={image}
                        setImage={setImage}
                        setData={setData}
                    />
                    <Button
                        disabled={disabled}
                        loading={createLoading}
                        className={styles.create}
                        type='primary'
                        onClick={() => createProduct()}
                    >
                        Tạo sản phẩm
                    </Button>
                </Col>
                <Col xl={12}>
                    <Detail
                        products={products}
                        disabled={detailDisabled}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Create

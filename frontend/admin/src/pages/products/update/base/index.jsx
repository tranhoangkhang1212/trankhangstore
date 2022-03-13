import React, { useState } from 'react'
import { Input, Select, message, Button } from 'antd'
import axios from 'axios'
import { useMount } from 'ahooks'
import ImageUpload from '../imageUpload'
import styles from './base.module.less'
import './base.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/brands/all'
const apiGetBasicData = apiUrl + '/api/products/'
const apiUpdate = apiUrl + '/api/products/update-basic'

const imgbbUploader = require('imgbb-uploader')
const key = process.env.REACT_APP_IMGBB_API_KEY

const { Option } = Select

const Base = props => {
    const [brandData, setBrandData] = useState([])
    const [basicData, setBasicData] = useState([])
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([])
    const [updateLoading, setUpdateLoading] =
        useState(false)
    const [data, setData] = useState()
    const [productBaseData, setProductBaseData] = useState({
        id: props.id,
        brandId: '',
        name: '',
        imageUrl: '',
        price: '',
        discount: '',
    })

    const getAllBrand = async () => {
        setLoading(true)
        await axios
            .get(api)
            .then(res => {
                const data = res.data
                setBrandData(data)
            })

            .finally(() => setLoading(false))
    }

    const updateProductBase = async () => {
        setUpdateLoading(true)
        await axios
            .patch(apiUpdate, productBaseData)
            .then(() =>
                message.success(
                    'Cập nhật chi tiết cho sản phẩm thành công'
                )
            )
            .catch(() =>
                message.error(
                    'Cập nhật thông tin chi tiết thất bại!'
                )
            )
            .finally(() => {
                setUpdateLoading(false)
            })
    }

    const getBasicData = async () => {
        setLoading(true)
        await axios
            .get(apiGetBasicData + `${props.id}/basic`)
            .then(res => setBasicData(res.data))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getAllBrand()
        getBasicData()
    })

    const handleInputChange = e => {
        const value = e.target.value
        const name = e.target.name
        setProductBaseData({
            ...productBaseData,
            [name]: value,
        })
    }

    let base64
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
                setProductBaseData({
                    ...productBaseData,
                    imageUrl: res.url,
                })
                message.success('Tải ảnh lên thành công')
            })
            .catch(() => {
                message.error('Tải ảnh lên thất bại!')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleUpload = () => {
        myUrl(data.file.name)
        let output
        const pegs = data.data_url.indexOf('base64,')
        output = data.data_url.slice(0, pegs + 7)
        base64 = data.data_url.replace(output, '')
    }

    const handleSelectChange = value => {
        setProductBaseData({
            ...productBaseData,
            brandId: value,
        })
    }

    const handleUpdate = () => {
        updateProductBase()
    }

    return (
        <>
            {loading === false &&
                basicData?.map(product => (
                    <div>
                        <h2>Thông tin cơ bản</h2>
                        <div className={styles.product_data}>
                            <label htmlFor='name'>Tên sản phẩm</label>
                            <Input
                                name='name'
                                id='name'
                                autocomplete='off'
                                onChange={handleInputChange}
                                defaultValue={product.name}
                            />
                            <div className={styles.price}>
                                <div>
                                    <label htmlFor='price'>Giá</label>
                                    <Input
                                        defaultValue={
                                            product.price
                                        }
                                        autocomplete='off'
                                        type='number'
                                        onChange={handleInputChange}
                                        name='price'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='discount'>
                                        Giảm giá (%)
                                    </label>
                                    <Input
                                        defaultValue={
                                            product.discount
                                        }
                                        autocomplete='off'
                                        type='number'
                                        onChange={handleInputChange}
                                        name='discount'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='discount'>
                                        Số lượng
                                    </label>
                                    <Input
                                        defaultValue={
                                            product.qty
                                        }
                                        autocomplete='off'
                                        type='number'
                                        onChange={handleInputChange}
                                        name='qty'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.brand_rate}>
                            <div>
                                <p className={styles.brand}>Chọn hãng</p>
                                <Select
                                    className={styles.select}
                                    defaultValue={product.brandName}
                                    placeholder='Chọn thương hiệu'
                                    optionFilterProp='children'
                                    onChange={handleSelectChange}
                                >
                                    {loading === false &&
                                        brandData.map(brand => (
                                            <Option
                                                onChange={
                                                    handleSelectChange
                                                }
                                                value={brand.id}
                                                name='brandId'
                                            >
                                                {brand.name}
                                            </Option>
                                        ))}
                                </Select>
                            </div>
                            <div className={styles.rate}>
                                <label htmlFor='rate'>
                                    Đánh giá mặc định
                                </label>
                                <Input
                                    autocomplete='off'
                                    type='number'
                                    onChange={handleInputChange}
                                    name='rate'
                                    defaultValue={
                                        product.rate
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <p className={styles.title}>
                                Hình ảnh
                            </p>
                            <ImageUpload
                                buttonName='Tải lên'
                                loading={loading}
                                onClick={() => handleUpload()}
                                className={styles.upload_image}
                                image={image}
                                imageUrl={product.imageUrl}
                                setImage={setImage}
                                setData={setData}
                            />
                        </div>
                        <div className={styles.btn_update}>
                            <Button
                                loading={updateLoading}
                                type='primary'
                                onClick={() => handleUpdate()}
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Base

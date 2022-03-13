import React, { useState } from 'react'
import { Form, Input, message, Button } from 'antd'
import axios from 'axios'
import { useMount } from 'ahooks'
import ImageUpload from '../imageUpload'
import styles from './detail.module.less'
import './detail.less'

const { TextArea } = Input

const apiUrl = process.env.REACT_APP_API_URL
const apiUpdate = apiUrl + '/api/products/update-detail'
const apiGetDetailData = apiUrl + '/api/products/'

const imgbbUploader = require('imgbb-uploader')
const key = process.env.REACT_APP_IMGBB_API_KEY

const detailValues = [
    {
        key: 'screen',
        name: 'Màn hình',
    },
    {
        key: 'OS',
        name: 'Hệ điều hành',
    },
    {
        key: 'frontCamera',
        name: 'Camera trước',
    },
    {
        key: 'backCamera',
        name: 'Camera sau',
    },
    {
        key: 'chip',
        name: 'Chip',
    },
    {
        key: 'RAM',
        name: 'RAM',
    },
    {
        key: 'ROM',
        name: 'Bộ nhớ trong',
    },
    {
        key: 'sim',
        name: 'Sim',
    },
    {
        key: 'battery',
        name: 'Pin và Sạc',
    },
]

const Detail = props => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] =
        useState(false)
    const [image, setImage] = useState([])
    const [data, setData] = useState()

    // Data create
    const [productDetailsData, setProductDetailsData] =
        useState({
            productID: props.id,
            screen: '',
            OS: '',
            imgDetail: '',
            frontCamera: '',
            backCamera: '',
            chip: '',
            RAM: '',
            ROM: '',
            sim: '',
            battery: '',
            color: '',
            warranty: '',
            sets: '',
            promotional: '',
        })

    const getDetailData = async () => {
        await axios
            .get(apiGetDetailData + `${props.id}/detail`)
            .then(res => setProducts(res.data))
    }

    useMount(() => {
        getDetailData()
    }, [])

    console.log(products)

    const updateProductDetails = async () => {
        setUpdateLoading(true)
        await axios
            .patch(apiUpdate, productDetailsData)
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

    const handelInputChange = e => {
        const name = e.target.name
        const value = e.target.value
        setProductDetailsData({
            ...productDetailsData,
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
                setProductDetailsData({
                    ...productDetailsData,
                    imgDetail: res.url,
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

    const handleFormFinish = () => {
        updateProductDetails()
    }

    return (
        <div>
            <h2>Thông tin chi tiết</h2>
            {products?.map(product => (
                <div className={styles.container}>
                    <Form
                        onFinish={handleFormFinish}
                        layout='vertical'
                        initialValues={product.detail}
                    >
                        <Form.Item
                            className={styles.select_product}
                            name='name'
                            label='Tên sản phẩm'
                            initialValue={product.name}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <div className={styles.first_detail}>
                            {detailValues.map(
                                (value, index) => (
                                    <Form.Item
                                        key={index}
                                        label={value.name}
                                        name={value.key}
                                        className={
                                            styles.first_detail_content
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: `Vui lòng nhập ${value.name}`,
                                            },
                                        ]}
                                    >
                                        <Input
                                            onInput={
                                                handelInputChange
                                            }
                                            name={value.key}
                                        />
                                    </Form.Item>
                                )
                            )}
                            <Form.Item
                                key='color'
                                label='Màu sắc'
                                name='color'
                                className={
                                    styles.first_detail_content
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: `Vui lòng nhập màu sắc`,
                                    },
                                ]}
                                initialValue={
                                    product.color
                                }
                            >
                                <Input
                                    onInput={handelInputChange}
                                    name='color'
                                />
                            </Form.Item>
                        </div>
                        <div className={styles.second_details}>
                            <Form.Item
                                className={
                                    styles.second_details_content
                                }
                                label='Chế độ bảo hành'
                                name='warranty'
                                initialValue={
                                    product.warranty
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập chế độ bảo hành',
                                    },
                                ]}
                            >
                                <TextArea
                                    onInput={
                                        handelInputChange
                                    }
                                    name='warranty'
                                />
                            </Form.Item>
                            <Form.Item
                                className={
                                    styles.second_details_content
                                }
                                label='Bộ sản phẩm gồm'
                                name='sets'
                                initialValue={
                                    product.sets
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập bộ sản phẩm',
                                    },
                                ]}
                            >
                                <TextArea
                                    onInput={
                                        handelInputChange
                                    }
                                    name='sets'
                                />
                            </Form.Item>
                            <Form.Item
                                className={
                                    styles.second_details_content
                                }
                                label='Khuyến mãi đặc biệt'
                                name='promotional'
                                initialValue={
                                    product.promotional
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập khuyến mãi đặc biệt',
                                    },
                                ]}
                            >
                                <p className={styles.description}>(Nếu có nhiều khuyến mãi thì kết thúc mỗi khuyến mãi bằng dấu ";". Nếu không có thì để trống)</p>
                                <TextArea
                                    onInput={
                                        handelInputChange
                                    }
                                    name='promotional'
                                />
                            </Form.Item>
                            <Form.Item>
                                <p className={styles.title}>
                                    Hình ảnh chi tiết
                                </p>
                                <ImageUpload
                                    loading={loading}
                                    onClick={() =>
                                        handleUpload()
                                    }
                                    className={
                                        styles.upload_image
                                    }
                                    image={image}
                                    imageUrl={
                                        product.imgDetail
                                    }
                                    setImage={setImage}
                                    setData={setData}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    loading={updateLoading}
                                    className={styles.submit}
                                    type='primary'
                                    htmlType='submit'
                                >
                                    Cập nhật chi tiết
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            ))}
        </div>
    )
}

export default Detail

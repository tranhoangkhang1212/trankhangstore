import React, { useState } from 'react'
import { Form, Input, Button, Drawer, message } from 'antd'
import axios from 'axios'
import ImageUpload from '../../../components/imageUpload'
import styles from './create.module.less'

const key = process.env.REACT_APP_IMGBB_API_KEY
const imgbbUploader = require('imgbb-uploader')

const api = process.env.REACT_APP_API_URL
const apiCreate = api + '/api/brands/create'

const Create = props => {
    let base64

    const [loading, setLoading] = useState(false)
    const [createLoading, setCreateLoading] =
        useState(false)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState()
    const [image, setImage] = useState([])
    const [brandData, setBrandData] = useState({
        name: '',
        image: '',
    })

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
                setBrandData({
                    ...brandData,
                    image: res.url,
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

    const handleInputChange = e => {
        setBrandData({
            ...brandData,
            [e.target.name]: e.target.value,
        })
    }

    const handleCreateBrandApi = async () => {
        setCreateLoading(true)
        await axios
            .post(apiCreate, brandData)
            .then(() =>
                message.success('Tạo mới thành công')
            )
            .catch(() => message.error('Tạo mới thất bại!'))
            .finally(() => {
                setCreateLoading(false)
                props.reCallApi()
            })
    }

    const handleCreateBrand = () => {
        handleCreateBrandApi()
    }

    return (
        <div className={styles.container}>
            <Button
                type='primary'
                className={styles.add}
                onClick={() => setVisible(true)}
            >
                <i class='fas fa-plus'/>
            </Button>
            <Drawer
                title='Thêm mới thương hiệu'
                placement='right'
                onClose={() => setVisible(false)}
                visible={visible}
            >
                <Form
                    onFinish={handleCreateBrand}
                    layout='vertical'
                >
                    <Form.Item
                        label='Tên thương hiệu'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Vui lòng nhập tên thương hiệu',
                            },
                        ]}
                    >
                        <Input
                            name='name'
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <ImageUpload
                            buttonName='Tải lên'
                            loading={loading}
                            onClick={() => handleUpload()}
                            className={styles.upload_image}
                            image={image}
                            setImage={setImage}
                            setData={setData}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType='submit'
                            type='primary'
                            loading={createLoading}
                            className={styles.create}
                        >
                            Tạo thương hiệu
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default Create

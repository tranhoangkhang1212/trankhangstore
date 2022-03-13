import React, { useState } from 'react'
import SunEditor from 'suneditor-react'
import { message, Button, Select } from 'antd'
import axios from 'axios'
import ImageUpload from '../../../components/imageUpload'
import './create.less'
import 'suneditor/dist/css/suneditor.min.css'
import styles from './create.module.less'

const imgbbUploader = require('imgbb-uploader')
const key = process.env.REACT_APP_IMGBB_API_KEY

const api = process.env.REACT_APP_API_URL
const apiCreateUrl = api + '/api/news/create'

const { Option } = Select

const Create = () => {
    const [createLoading, setCreateLoading] = useState()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([])
    const [data, setData] = useState()
    const [postData, setPostData] = useState({
        title: '',
        summary: '',
        image: '',
        content: '',
        type: 'normal',
        author: '',
    })

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
                setPostData({
                    ...postData,
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
        const name = e.target.name
        const value = e.target.value
        setPostData({
            ...postData,
            [name]: value,
        })
    }

    console.log(postData)

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const handleChange = content => {
        setPostData(prev => ({
            ...prev,
            content: content,
        }))
    }

    const createPost = () => {
        setCreateLoading(true)
        axios
            .post(apiCreateUrl, postData)
            .then(() =>
                message.success('Tạo bài viết thành công')
            )
            .catch(() => message.error('Vui lòng thử lại!'))
            .finally(() => {
                setCreateLoading(false)
            })
    }

    const handleSelectTypePost = type => {
        setPostData({
            ...postData,
            type: type,
        })
    }

    return (
        <div className={styles.container} Button>
            <div className={styles.title}>
                <input
                    onChange={handleInputChange}
                    name='title'
                    placeholder='Tiêu đề'
                />
            </div>
            <div className={styles.summary}>
                <textArea
                    onChange={handleInputChange}
                    name='summary'
                    placeholder='Nội dung tóm tắt'
                />
            </div>
            <div className={styles.image}>
                <ImageUpload
                    buttonName='Tải lên'
                    loading={loading}
                    onClick={() => handleUpload()}
                    className={styles.upload_image}
                    image={image}
                    setImage={setImage}
                    setData={setData}
                />
                <div style={{ marginTop: '12px' }}>
                    <Select
                        defaultValue='normal'
                        onChange={handleSelectTypePost}
                    >
                        <Option value='normal'>
                            Bài viết bình thường
                        </Option>
                        <Option value='about'>
                            Trang Giới thiệu
                        </Option>
                    </Select>
                </div>
            </div>
            <div className={styles.author}>
                <input
                    onChange={handleInputChange}
                    name='author'
                    placeholder='Tên tác giả'
                />
                <Button
                    loading={createLoading}
                    type='primary'
                    onClick={createPost}
                >
                    Tạo bài viết
                </Button>
            </div>
            <div>
                <SunEditor
                    className={styles.editor}
                    height={330}
                    autoFocus
                    placeholder='Viết nội dung ở đây'
                    setDefaultStyle="font-family: 'Roboto', sans-serif; font-size: 16px;"
                    onChange={handleChange}
                    setOptions={{
                        buttonList: [
                            ['undo', 'redo'],
                            [
                                'font',
                                'fontSize',
                                'formatBlock',
                            ],
                            [
                                'paragraphStyle',
                                'blockquote',
                            ],
                            [
                                'bold',
                                'underline',
                                'italic',
                                'strike',
                                'subscript',
                                'superscript',
                            ],
                            [
                                'fontColor',
                                'hiliteColor',
                                'textStyle',
                            ],
                            ['removeFormat'],
                            '/', // Line break
                            ['outdent', 'indent'],
                            [
                                'align',
                                'horizontalRule',
                                'list',
                                'lineHeight',
                            ],
                            ['table', 'link', 'image'], // You must add the 'katex' library at options to use the 'math' plugin.
                            /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                            [
                                'fullScreen',
                                'showBlocks',
                                'codeView',
                            ],
                            ['preview'],
                            ['save'],
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default Create

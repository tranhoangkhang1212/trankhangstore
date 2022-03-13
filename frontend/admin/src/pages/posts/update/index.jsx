import React, { useState } from 'react'
import SunEditor from 'suneditor-react'
import { message, Button, Input } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useMount } from 'ahooks'
import ImageUpload from '../../products/update/imageUpload'
import 'suneditor/dist/css/suneditor.min.css'
import styles from './update.module.less'

const imgbbUploader = require('imgbb-uploader')
const key = process.env.REACT_APP_IMGBB_API_KEY

const api = process.env.REACT_APP_API_URL
const apiGetPostById = api + '/api/news/id='
const apiUpdatePostId = api + '/api/news/update'

const { TextArea } = Input

const PostUpdate = () => {
    const { id } = useParams()

    const [postData, setPostData] = useState([])
    const [state, setState] = useState({
        getLoading: false,
        postUpdateLoading: false,
    })
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([])
    const [data, setData] = useState()
    const [updateData, setUpdateData] = useState({
        id: id,
        title: '',
        summary: '',
        image: '',
        content: '',
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
                setUpdateData({
                    ...updateData,
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
        setUpdateData({
            ...updateData,
            [name]: value,
        })
    }

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const handleChange = content => {
        setUpdateData({
            ...updateData,
            content: content,
        })
    }

    const handleGetPostById = async () => {
        setState({
            ...state,
            getLoading: true,
        })
        await axios
            .get(apiGetPostById + id)
            .then(res => {
                const data = res.data
                setPostData(data)
            })
            .catch(err => console.log(err))
            .finally(() =>
                setState({
                    ...state,
                    getLoading: false,
                })
            )
    }

    const handleApiUpdatePostId = async () => {
        await axios
            .patch(apiUpdatePostId, updateData)
            .then(() =>
                message.success(
                    'Cập nhật bài viết thành công'
                )
            )
            .catch(() => message.error('Vui lòng thử lại'))
    }

    useMount(() => {
        handleGetPostById()
    })

    return (
        <>
            {state.getLoading === false &&
                postData.map(post => (
                    <div
                        className={styles.container}
                        Button
                    >
                        <div className={styles.title}>
                            <span>Tiêu đề</span>
                            <input
                                defaultValue={post.title}
                                onChange={handleInputChange}
                                name='title'
                                placeholder='Tiêu đề'
                            />
                        </div>
                        <div className={styles.summary}>
                            <span>Tóm tắt</span>
                            <TextArea
                                defaultValue={post.summary}
                                onChange={handleInputChange}
                                name='summary'
                                placeholder='Nội dung tóm tắt'
                            />
                        </div>
                        <div className={styles.image}>
                            <span>Ảnh đại diện</span>
                            <ImageUpload
                                buttonName='Tải lên'
                                loading={loading}
                                onClick={() =>
                                    handleUpload()
                                }
                                className={
                                    styles.upload_image
                                }
                                image={image}
                                setImage={setImage}
                                imageUrl={post.image}
                                setData={setData}
                            />
                        </div>
                        <div className={styles.author}>
                            <input
                                defaultValue={post.author}
                                onChange={handleInputChange}
                                name='author'
                                placeholder='Tên tác giả'
                            />
                            <Button
                                loading={
                                    state.postUpdateLoading
                                }
                                type='primary'
                                onClick={
                                    handleApiUpdatePostId
                                }
                            >
                                Cập nhật bài viết
                            </Button>
                        </div>
                        <div>
                            <SunEditor
                                defaultValue={post.content}
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
                                        [
                                            'outdent',
                                            'indent',
                                        ],
                                        [
                                            'align',
                                            'horizontalRule',
                                            'list',
                                            'lineHeight',
                                        ],
                                        [
                                            'table',
                                            'link',
                                            'image',
                                        ], // You must add the 'katex' library at options to use the 'math' plugin.
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
                ))}
        </>
    )
}

export default PostUpdate

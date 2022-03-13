import React, { useState } from 'react'
import { Table, Button, message, Popconfirm } from 'antd'
import { useMount } from 'ahooks'
import axios from 'axios'
import styles from './list.module.less'

const { Column } = Table

const api = process.env.REACT_APP_API_URL
const apiGetAllPost = api + '/api/news/all'
const apiDeletePost = api + '/api/news/delete?id='

const ListPost = () => {
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] =
        useState(false)
    const [postData, setPostData] = useState([])

    const getAllPost = async () => {
        setLoading(true)
        await axios
            .get(apiGetAllPost + '?type=about')
            .then(res => {
                const data = res.data
                setPostData(data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const handleApiDeletePost = async id => {
        setDeleteLoading(true)
        await axios
            .delete(apiDeletePost + id)
            .catch(() => message.error('Vui lòng thử lại!'))
            .finally(() => {
                getAllPost()
                setDeleteLoading(false)
                message.success('Xóa bài viết thành công')
            })
    }

    useMount(() => {
        getAllPost()
    })

    const handleDeletePost = id => {
        handleApiDeletePost(id)
    }

    return (
        <div className={styles.list_post}>
            <Table dataSource={postData} loading={loading}>
                <Column
                    title='id'
                    key='id'
                    render={post => <span>#{post.id}</span>}
                />
                <Column
                    title='Tiêu đề'
                    key='title'
                    dataIndex='title'
                />
                <Column
                    title='Tóm tắt'
                    key='summary'
                    dataIndex='summary'
                />
                <Column
                    title='Hình ảnh'
                    key='image'
                    render={post => (
                        <>
                            <img
                                src={post.image}
                                alt={post.title}
                            />
                        </>
                    )}
                />
                <Column
                    title='Thao tác'
                    key='touch'
                    render={post => (
                        <div className={styles.touch}>
                            <Button
                                type='primary'
                                href={
                                    '/post/update/' +
                                    post.id
                                }
                            >
                                Cập nhật
                            </Button>
                            <Popconfirm
                                title='Bạn có chắc chắn muốn xóa bài viết?'
                                onConfirm={() =>
                                    handleDeletePost(
                                        post.id
                                    )
                                }
                                okText='Xóa'
                                cancelText='Hủy'
                            >
                                <Button
                                    loading={deleteLoading}
                                >
                                    Xóa
                                </Button>
                            </Popconfirm>
                        </div>
                    )}
                />
            </Table>
        </div>
    )
}

export default ListPost

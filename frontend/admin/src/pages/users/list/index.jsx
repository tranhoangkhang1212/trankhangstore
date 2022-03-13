import React, { useState } from 'react'
import axios from 'axios'
import { useMount } from 'ahooks'
import { Table, message, Popconfirm } from 'antd'
import styles from './list.module.less'

const { Column } = Table

const api = process.env.REACT_APP_API_URL
const apiGetAllUser = api + '/api/user/all'
const apiDeleteUser = api + '/api/user/delete?id='

const ListUser = () => {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])

    const getAllUser = async () => {
        setLoading(true)
        await axios
            .get(apiGetAllUser)
            .then(res => {
                const data = res.data
                setUserData(data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const handleApiDeleteUser = async id => {
        setLoading(true)
        await axios
            .delete(apiDeleteUser + id)
            .catch(() => message.error('Vui lòng thử lại!'))
            .finally(() => {
                setLoading(false)
                message.success('Xóa tài khoản thành công')
                getAllUser()
            })
    }

    useMount(() => {
        getAllUser()
    })

    const handleDeleteUser = id => {
        handleApiDeleteUser(id)
    }

    return (
        <div>
            <Table
                dataSource={userData}
                pagination={false}
                loading={loading}
            >
                <Column
                    align='center'
                    title='ID'
                    key='id'
                    render={user => (
                        <>
                            <span>#{user.id}</span>
                        </>
                    )}
                />
                <Column
                    title='Tên tài khoản'
                    key='userName'
                    dataIndex='userName'
                />
                <Column
                    title='Họ Tên'
                    key='fullName'
                    dataIndex='fullName'
                />
                <Column
                    title='Số điện thoại'
                    key='phoneNumber'
                    dataIndex='phoneNumber'
                />
                <Column
                    title='Email'
                    key='email'
                    dataIndex='email'
                />
                <Column
                    title='Địa chỉ'
                    key='address'
                    dataIndex='address'
                />
                <Column
                    width='50px'
                    title='Xóa'
                    key='delete'
                    render={user => (
                        <>
                            <Popconfirm
                                title='Bạn có chắc chắn muốn xóa tài khoản này?'
                                onConfirm={() =>
                                    handleDeleteUser(
                                        user.id
                                    )
                                }
                                okText='Xóa'
                                cancelText='Hủy'
                                placement='topRight'
                            >
                                <span
                                    className={
                                        styles.delete
                                    }
                                >
                                    <i class='fas fa-times'/>
                                </span>
                            </Popconfirm>
                        </>
                    )}
                />
            </Table>
        </div>
    )
}

export default ListUser

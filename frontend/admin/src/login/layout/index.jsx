import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Input, Button, message } from 'antd'
import styles from './layout.module.less'
import './layout.less'

const api = process.env.REACT_APP_API_URL
const apiUrl = api + '/api/layout/get'
const apiLogin = api + '/api/auth/admin'

const Layout = () => {
    const [logoData, setLogoData] = useState([])
    const [loginData, setLoginData] = useState({
        userName: '',
        password: '',
        role: 'ADMIN',
    })

    const getLogoData = async () => {
        await axios
            .get(apiUrl + '?type=LOGO&hide=false&qty=1')
            .then(res => setLogoData(res.data))
    }

    useEffect(() => {
        getLogoData()
    }, [])

    const handleLoginDataChange = e => {
        const name = e.target.name
        const value = e.target.value
        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLogin = () => {
        axios
            .post(apiLogin, loginData)
            .then(res => {
                handleLoginSuccessful(res.data)
            })
            .catch(() =>
                message.error(
                    'Sai tên đăng nhập hoặc mật khẩu!'
                )
            )
    }

    const handleLoginSuccessful = values => {
        sessionStorage.setItem(
            'data',
            JSON.stringify({
                name: values.data.full_name,
            })
        )
        sessionStorage.setItem('token', 'Logged')
        window.location.pathname = '/orders'
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {logoData?.map(logo => (
                    <div className={styles.logo}>
                        <img src={logo.image} alt='Logo' />
                    </div>
                ))}
                <Form
                    className={styles.form}
                    layout='vertical'
                    name='Login'
                    onFinish={handleLogin}
                >
                    <Form.Item
                        label='Tài khoản hoặc Email'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Tên tài khoản không được để trống!',
                            },
                        ]}
                    >
                        <Input
                            name='userName'
                            placeholder='Nhập tên tài khoản hoặc Email'
                            onChange={handleLoginDataChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Mật khẩu'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Mật khẩu không được để trống!',
                            },
                        ]}
                    >
                        <Input.Password
                            name='password'
                            placeholder='Nhập mật khẩu'
                            onChange={handleLoginDataChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size='large'
                            type='primary'
                            htmlType='submit'
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Layout

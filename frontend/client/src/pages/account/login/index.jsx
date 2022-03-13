import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    Checkbox,
    message,
} from 'antd'
import styles from './login.module.less'
import Cookies from 'js-cookie'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/auth/login'

const sign = require('jwt-encode')
const secret = 'tranhoangkhang'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        userName: '',
        password: '',
    })
    const [status, setStatus] = useState()
    const [userData, setUserData] = useState()

    const getUserData = async () => {
        setLoading(true)
        await axios
            .post(api, state)
            .then(res => {
                const data = res.data
                setStatus(data.status)
                setUserData(data.data)
                message.success('Đăng nhập thành công')
            })
            .catch(() =>
                message.error(
                    'Sai tên đăng nhập hoặc mật khẩu!'
                )
            )
            .finally(() => {
                setLoading(false)
            })
    }

    const handleChange = e => {
        const value = e.target.value
        setState({
            ...state,
            [e.target.name]: value,
        })
    }

    const onFinish = () => {
        getUserData()
    }

    const loginSuccessful = () => {
        window.location.pathname = '/'
        const token = sign(userData, secret)
        Cookies.set('token', token, {
            expires: 30,
        })
    }

    if (loading === false && status) {
        loginSuccessful()
    }

    return (
        <div className={styles.login}>
            <h2>Đăng nhập</h2>
            <Form
                size='large'
                labelAlign='left'
                className={styles.content}
                name='login'
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete
            >
                <Form.Item
                    label='Tài khoản'
                    name='userName'
                    rules={[
                        {
                            required: true,
                            message:
                                'Vui lòng nhập tên tài khoản!',
                        },
                    ]}
                >
                    <Input
                        placeholder='User Name'
                        name='userName'
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item
                    label='Mật khẩu'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message:
                                'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Password ...'
                        className={styles.password}
                        name='password'
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item
                    className={styles.checkbox}
                    name='remember'
                    valuePropName='checked'
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <div className={styles.btn}>
                        <div>
                            <Link to='/register'>
                                Đăng ký
                            </Link>
                        </div>

                        <div>
                            <Button
                                type='primary'
                                htmlType='submit'
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login

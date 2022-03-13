import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    Form,
    Input,
    Button,
    Checkbox,
    notification,
} from 'antd'
import styles from './register.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/auth/register'

const Register = () => {
    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 24,
        },
    }

    const [state, setState] = useState({
        address: '',
        email: '',
        fullName: '',
        password: '',
        phoneNumber: '',
        userName: '',
    })

    const [status, setStatus] = useState('')

    const register = async () => {
        await axios.post(api, state).then(res => {
            const data = res.data
            setStatus(data.status)
        })
    }

    const handleChange = e => {
        const value = e.target.value
        setState({
            ...state,
            [e.target.name]: value,
        })
    }

    const openNotification = (type, text) => {
        notification[type]({
            message: text,
        })
    }

    const notice = () => {
        if (status) {
            openNotification('success', 'Đăng ký thành công')
        } else {
            openNotification('error', 'Đăng ký thất bại!')
        }
    }

    const onFinish = () => {
        register()
        notice()
    }

    return (
        <div className={styles.register}>
            <h2>Đăng ký</h2>
            <Form
                {...layout}
                layout='horizontal'
                size='large'
                className={styles.content}
                name='Register'
                onFinish={onFinish}
                autoComplete='off'
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
                        name='userName'
                        onChange={handleChange}
                        placeholder='User Name'
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
                        onChange={handleChange}
                        name='password'
                        placeholder='Password'
                        className={styles.password}
                    />
                </Form.Item>

                <Form.Item
                    label='Họ tên'
                    name='fullName'
                    rules={[
                        {
                            required: true,
                            message:
                                'Vui lòng nhập họ tên!',
                        },
                    ]}
                >
                    <Input
                        name='fullName'
                        placeholder='Full Name'
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item label='Email' name='email'>
                    <Input
                        name='email'
                        placeholder='Email'
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item
                    label='Địa chỉ'
                    name='address'
                    rules={[
                        {
                            required: true,
                            message:
                                'Vui lòng nhập địa chỉ!',
                        },
                    ]}
                >
                    <Input
                        name='address'
                        placeholder='Address'
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item
                    label='Điện thoại'
                    name='phoneNumber'
                    rules={[
                        {
                            required: true,
                            message:
                                'Vui lòng nhập số điện thoại',
                        },
                    ]}
                >
                    <Input
                        name='phoneNumber'
                        placeholder='Phone number'
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item
                    className={styles.checkbox}
                    name='remember'
                    valuePropName='checked'
                >
                    <Checkbox>
                        Đồng ý với các chính sách của chúng
                        tôi
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <div className={styles.btn}>
                        <div>
                            <Link to='/login'>
                                Đăng nhập
                            </Link>
                        </div>
                        <div>
                            <Button
                                size='large'
                                type='primary'
                                htmlType='submit'
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register

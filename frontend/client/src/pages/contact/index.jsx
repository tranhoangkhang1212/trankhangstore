import React from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import styles from './contact.module.less'

const Contact = () => {
    const onFinish = values => {
        console.log(values)
    }
    return (
        <div className={styles.container}>
            <Row>
                <Col
                    className={styles.form}
                    xl={12}
                    lg={12}
                    md={24}
                    sm={24}
                    xs={24}
                >
                    <div className={styles.form_title}>
                        <h1>Công ty Trần Khang</h1>
                        <div className={styles.icon}>
                            <div>
                                <i class='fas fa-map-marker-alt'/>
                                <span>
                                    Địa chỉ: 314 Huỳnh Tấn
                                    Phát, Tân Thuận Tây,
                                    Quận 7, Tp.HCM
                                </span>
                            </div>
                            <div>
                                <i class='fas fa-mobile-alt'/>
                                <span>
                                    Số điện thoại: 19009999
                                </span>
                            </div>
                            <div>
                                <i class='fas fa-envelope'/>
                                <span>
                                    Email:
                                    support@trankhangstore.vn
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.form_content}>
                        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
                        <Form
                            name='nest-messages'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập họ tên',
                                    },
                                ]}
                            >
                                <Input placeholder='Họ và tên *' />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message:
                                            'Vui lòng nhập emal',
                                    },
                                ]}
                            >
                                <Input placeholder='Email *' />
                            </Form.Item>
                            <Form.Item
                                name='phone'
                                rules={[
                                    {
                                        required: true,
                                        type: 'phone',
                                        message:
                                            'Vui lòng nhập số điện thoại',
                                    },
                                ]}
                            >
                                <Input placeholder='Số điện thoại *' />
                            </Form.Item>
                            <Form.Item
                                name='content'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập nội dung',
                                    },
                                ]}
                            >
                                <Input.TextArea placeholder='Nội dung *' />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                >
                                    Gửi liên hệ của bạn
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
                <Col
                    xl={12}
                    lg={12}
                    md={24}
                    sm={24}
                    xs={24}
                >
                    <div>
                        <iframe
                            className={styles.map}
                            title='map'
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7898917851103!2d106.726360114663!3d10.750670092339027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752586bcd81489%3A0x88c4981aa35ed955!2zMzE0IEh14buzbmggVOG6pW4gUGjDoXQsIFTDom4gVGh14bqtbiBUw6J5LCBRdeG6rW4gNywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1641920083673!5m2!1svi!2s'
                            loading='lazy'
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Contact

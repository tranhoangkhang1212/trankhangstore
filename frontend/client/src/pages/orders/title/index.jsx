import React from 'react'
import { Row, Col } from 'antd'
import styles from './title.module.less'

const index = () => {
    return (
        <Row align='middle' className={styles.cart_title}>
            <Col className={styles.title} xl={5}>
                <span>Tên</span>
            </Col>
            <Col className={styles.title} xl={5}>
                <span>Hình ảnh</span>
            </Col>
            <Col className={styles.title} xl={4}>
                <span>Số lượng</span>
            </Col>
            <Col className={styles.title} xl={5}>
                <span>Giá</span>
            </Col>
            <Col className={styles.title} xl={5}>
                <span>Thành tiền</span>
            </Col>
        </Row>
    )
}

export default index

import React from 'react'
import { Row, Col } from 'antd'
import Most from '../most'
import Content from './content'
import styles from './detail.module.less'

const Detail = () => {
    return (
        <div className={styles.container}>
            <Row>
                <Col xl={18} lg={18} md={18} xs={18}>
                    <Content />
                </Col>
                <Col xl={6} lg={6} md={6} xs={6}>
                    <Most title={'Bài viết liên quan'} />
                </Col>
            </Row>
        </div>
    )
}

export default Detail

import React from 'react'
import { Row, Col } from 'antd'
import Main from './main'
import Most from './most'
import styles from './news.module.less'

const News = () => {
    return (
        <div className={styles.container}>
            <h1>24h Công nghệ</h1>
            <Row>
                <Col xl={18} lg={18} md={18} xs={18}>
                    <Main />
                </Col>
                <Col xl={6} lg={6} md={6} xs={6}>
                    <Most title={'Bài viết mới nhất'} />
                </Col>
            </Row>
        </div>
    )
}

export default News

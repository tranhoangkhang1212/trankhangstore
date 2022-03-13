import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import Base from './base'
import Detail from './detail'
import styles from './update.module.less'

const Update = () => {
    const { id } = useParams()

    return (
        <div className={styles.container}>
            <Row>
                <Col
                    className={styles.product_base}
                    xl={12}
                >
                    <Base
                        id={id}
                    />
                </Col>
                <Col xl={12}>
                    <Detail
                        id={id}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Update

import React from 'react'
import { Row, Col } from 'antd'
import { specification } from '../../../../public/function'
import styles from './specifications.module.less'

const Specifications = ({ data }) => {
    return (
        <div className={styles.container}>
            <Row>
                <Col
                    className={styles.image}
                    xl={14}
                    lg={13}
                    md={13}
                    xs={24}
                >
                    <img
                        src={data.imgDetail}
                        alt={data.name}
                    />
                </Col>

                <Col
                    className={styles.spec}
                    xl={10}
                    lg={11}
                    md={11}
                    xs={24}
                >
                    <h2>Cấu hình điện thoại {data.name}</h2>
                    {specification('phone', data.detail)}
                </Col>
            </Row>
        </div>
    )
}

export default Specifications

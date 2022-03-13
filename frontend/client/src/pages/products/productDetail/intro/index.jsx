import React from 'react'
import { Row, Col, Button } from 'antd'
import styles from './intro.module.less'
import { useDispatch } from 'react-redux'
import { AddCart } from '../../../../redux/actions'
import {
    discount,
    formatCash,
} from '../../../../public/function'

const Intro = ({ data }) => {
    const dispatch = useDispatch()

    const handleAddClick = data => {
        dispatch(AddCart(data))
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.product_name}>
                    <h1>Điện thoại {data.name}</h1>
                </div>
                <Row>
                    <Col
                        className={styles.item}
                        xl={7}
                        lg={7}
                        md={8}
                        sm={24}
                        xs={24}
                    >
                        <div>
                            <img
                                src={data.imageUrl}
                                alt={data.name}
                            />
                        </div>
                    </Col>
                    <Col
                        className={styles.product_intro}
                        xl={9}
                        lg={9}
                        md={9}
                        sm={24}
                        xs={24}
                    >
                        <div>
                            <div className={styles.price}>
                                <h3>
                                    {formatCash(
                                        discount(
                                            data.price,
                                            data.discount
                                        )
                                    )}
                                </h3>
                                <span>
                                    {formatCash(data.price)}
                                </span>
                            </div>
                            <div>
                                <p>
                                    Màu sắc:{' '}
                                    <b>{data.color}</b>
                                </p>
                                <p>
                                    Bảo hành:{' '}
                                    <b>{data.warranty}</b>
                                </p>
                                <p>
                                    Bộ sản phẩm gồm:{' '}
                                    {data.sets}
                                </p>
                            </div>
                            <div className={styles.button}>
                                <div>
                                    <Button
                                        className={
                                            styles.buy_now
                                        }
                                    >
                                        Mua ngay
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        type='primary'
                                        onClick={() =>
                                            handleAddClick(
                                                data
                                            )
                                        }
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col
                        className={styles.promotional}
                        xl={8}
                        lg={8}
                        md={7}
                        sm={24}
                        xs={24}
                    >
                        <div className={styles.title}>
                            <h3>Khuyến mãi đặc biệt</h3>
                        </div>
                        <div className={styles.items}>
                            {data.promotional.map(
                                (text, key) => (
                                    <div
                                        key={key}
                                        className={
                                            styles.promotional_content
                                        }
                                    >
                                        <i class='fas fa-gift'/>
                                        <p>
                                            <span>
                                                {text}
                                            </span>
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Intro

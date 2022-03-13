import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './news.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/news/get'

const News = () => {
    const [loading, setLoading] = useState(false)
    const [news, setNews] = useState([])

    const getProducts = async () => {
        setLoading(true)
        await axios
            .get(api + '?qty=5&type=normal')
            .then(res => {
                const data = res.data
                setNews(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getProducts()
    }, [])

    const primaryNews = news.slice(0, 2)
    const extraNews = news.slice(2, 5)

    return (
        <div className={styles.news}>
            <Spin
                spinning={loading}
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 28,
                        }}
                        spin
                    />
                }
            />

            {loading === false && (
                <>
                    <Link to='/news'>
                        <h2>24h Công nghệ</h2>
                    </Link>
                    <Row>
                        <Col lg={14} md={14} sm={24}>
                            <div className={styles.primary}>
                                {primaryNews.map(
                                    (item, key) => (
                                        <Link
                                            key={key}
                                            to='/'
                                        >
                                            <div
                                                className={
                                                    styles.primary_content
                                                }
                                            >
                                                <img
                                                    src={
                                                        item.image
                                                    }
                                                    alt={
                                                        item.title
                                                    }
                                                />
                                                <h3>
                                                    {
                                                        item.title
                                                    }
                                                </h3>
                                            </div>
                                        </Link>
                                    )
                                )}
                            </div>
                        </Col>
                        <Col lg={10} md={10} sm={24}>
                            <div className={styles.extra}>
                                {extraNews.map(
                                    (item, key) => (
                                        <Link
                                            key={key}
                                            to='/'
                                        >
                                            <div
                                                className={
                                                    styles.extra_content
                                                }
                                            >
                                                <img
                                                    src={
                                                        item.image
                                                    }
                                                    alt={
                                                        item.title
                                                    }
                                                />
                                                <h4>
                                                    {
                                                        item.title
                                                    }
                                                </h4>
                                            </div>
                                        </Link>
                                    )
                                )}
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    )
}

export default News

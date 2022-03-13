import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { timer } from '../../../public/function'
import styles from './most.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/news/get'

const Most = ({ title }) => {
    const [loading, setLoading] = useState(false)
    const [newsData, setNewsData] = useState([])

    const getNews = async () => {
        setLoading(true)
        await axios
            .get(api + `?qty=5&type=normal`)
            .then(res => {
                const data = res.data
                setNewsData(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getNews()
    }, [])

    const primaryNews = newsData.slice(0, 1)
    const secondaryNews = newsData.slice(1, 5)

    //  Display time once news
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
                        style={{ fontSize: 28 }}
                        spin
                    />
                }
            />

            {loading === false && (
                <>
                    <h2>{title}</h2>
                    {primaryNews.map(news => (
                        <div
                            key={news.id}
                            className={styles.primary}
                        >
                            <img
                                src={news.image}
                                alt={news.title}
                            />
                            <span>
                                {timer(news.created)}
                            </span>
                            <Link
                                to={`/news/detail/${news.id}`}
                            >
                                <h3>{news.title}</h3>
                            </Link>
                        </div>
                    ))}
                    {secondaryNews.map(news => (
                        <div className={styles.secondary}>
                            <Link
                                to={`/news/detail/${news.id}`}
                            >
                                <p>{news.title}</p>
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Most

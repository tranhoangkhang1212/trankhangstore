import React, { useState, useEffect } from 'react'
import { Spin, List } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { timer } from '../../../public/function'
import styles from './main.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/news/'

const Main = () => {
    const [loading, setLoading] = useState(false)
    const [allNews, setAllNews] = useState([])

    const getAllNews = async () => {
        setLoading(true)
        await axios
            .get(api + `all?type=normal`)
            .then(res => {
                const data = res.data
                setAllNews(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getAllNews()
    }, [])

    return (
        <div className={styles.main}>
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
                <List
                    pagination={{
                        pageSize: 9,
                    }}
                    grid={{
                        xl: 3,
                        lg: 3,
                        md: 2,
                        sm: 2,
                        xs: 2,
                    }}
                    dataSource={allNews}
                    renderItem={news => (
                        <div className={styles.item}>
                            <div>
                                <img
                                    src={news.image}
                                    alt={news.title}
                                />
                            </div>
                            <div
                                className={
                                    styles.item_content
                                }
                            >
                                <span>
                                    {timer(news.created)}
                                </span>
                                <Link
                                    to={`/news/detail/${news.id}`}
                                >
                                    <h3>{news.title}</h3>
                                </Link>
                            </div>
                        </div>
                    )}
                />
            )}
        </div>
    )
}

export default Main

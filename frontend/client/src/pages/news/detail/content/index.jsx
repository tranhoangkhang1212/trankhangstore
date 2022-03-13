import React, { useState } from 'react'
import axios from 'axios'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { timer } from '../../../../public/function'
import styles from './content.module.less'
import { useMount } from 'ahooks'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/news/'

const Content = () => {
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [newsData, setNewsData] = useState([])

    const getNews = async () => {
        setLoading(true)
        await axios
            .get(api + `id=${id}`)
            .then(res => {
                const data = res.data
                setNewsData(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getNews()
    })

    return (
        <div className={styles.container}>
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

            {loading === false &&
                newsData.map(news => (
                    <div key={news.id}>
                        <div className={styles.title}>
                            <h1>{news.title}</h1>
                            <div className={styles.text}>
                                <span>
                                    {timer(news.created)}
                                </span>
                                <i class='far fa-hand-point-right'/>
                                <span
                                    className={
                                        styles.author
                                    }
                                >
                                    {news.author}
                                </span>
                            </div>
                        </div>
                        {ReactHtmlParser(news.content)}
                    </div>
                ))}
        </div>
    )
}

export default Content

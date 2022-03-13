import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import styles from './about.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/news/about-page'

const About = props => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const getProductDetail = async () => {
        setLoading(true)
        await axios
            .get(api)
            .then(res => {
                const data = res.data
                setData(data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getProductDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={styles.news}>
            {loading === false &&
                data.map(news => (
                    <>{ReactHtmlParser(news.content)}</>
                ))}
        </div>
    )
}

export default About

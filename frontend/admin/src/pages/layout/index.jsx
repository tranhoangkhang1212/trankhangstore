import React, { createContext, useState } from 'react'
import Components from './components'
import axios from 'axios'
import { Row, Col } from 'antd'
import Pages from '../../components/preview/source'
import styles from './layout.module.less'
import { useMount } from 'ahooks'
import { Button, message } from 'antd'

export const layoutContext = createContext()

const api = process.env.REACT_APP_API_URL
const apiUrl = api + '/api/layout/get'
const apiUpdateLayout = api + '/api/layout/create'

const Layout = () => {
    const [loading, setLoading] = useState(false)
    const [layoutData, setLayoutData] = useState([])
    const [logoData, setLogoData] = useState([])
    const [bannerData, setBannerData] = useState([])
    const [miniBannerData, setMiniBannerData] = useState([])
    const [productsBannerData, setProductsBannerData] =
        useState([])
    const [
        productsMiniBannerData,
        setProductsMiniBannerData,
    ] = useState([])
    const [
        partnerBanner,
        setPartnerBanner,
    ] = useState([])

    const getLayoutData = async () => {
        await axios
            .get(apiUrl + '?type=LOGO&hide=false&qty=1')
            .then(res => {
                const data = res.data
                setLogoData(data)
            })
            .catch(err => console.log(err))
    }

    const getBannerData = async () => {
        await axios
            .get(apiUrl + '?type=BANNER&hide=false&qty=4')
            .then(res => {
                const data = res.data
                setBannerData(data)
            })
            .catch(err => console.log(err))
    }

    const getMiniBannerData = async () => {
        await axios
            .get(
                apiUrl +
                    '?type=MINI_BANNER&hide=false&qty=4'
            )
            .then(res => {
                const data = res.data
                setMiniBannerData(data)
            })
            .catch(err => console.log(err))
    }

    const getProductsBannerData = async () => {
        await axios
            .get(
                apiUrl +
                    '?type=PRODUCT_BANNER&hide=false&qty=4'
            )
            .then(res => {
                const data = res.data
                setProductsBannerData(data)
            })
            .catch(err => console.log(err))
    }

    const getProductsMiniBannerData = async () => {
        await axios
            .get(
                apiUrl +
                    '?type=PRODUCT_MINI_BANNER&hide=false&qty=4'
            )
            .then(res => {
                const data = res.data
                setProductsMiniBannerData(data)
            })
            .catch(err => console.log(err))
    }
    
    const getPartnerBanner = async () => {
        await axios
            .get(
                apiUrl +
                    '?type=PARTNER&hide=false&qty=1'
            )
            .then(res => {
                const data = res.data
                setPartnerBanner(data)
            })
            .catch(err => console.log(err))
    }

    const handleUpdateLayout = () => {
        setLoading(true)
        axios
            .post(apiUpdateLayout, layoutData)
            .then(() =>
                message.success(
                    'Cập nhật thông tin thành công'
                )
            )
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getLayoutData()
        getBannerData()
        getPartnerBanner()
        getMiniBannerData()
        getProductsBannerData()
        getProductsMiniBannerData()
    })

    return (
        <layoutContext.Provider
            value={{
                logoData,
                setLogoData,
                bannerData,
                setBannerData,
                miniBannerData,
                setMiniBannerData,
                partnerBanner,
                setPartnerBanner,
                productsBannerData,
                setProductsBannerData,
                productsMiniBannerData,
                setProductsMiniBannerData,
                layoutData,
                setLayoutData,
            }}
        >
            <div className={styles.container}>
                <Row>
                    <Col xl={9}>
                        <Components />
                    </Col>
                    <Col xl={15} className={styles.preview}>
                        <div className={styles.btn_save}>
                            <Button
                                loading={loading}
                                onClick={() =>
                                    handleUpdateLayout()
                                }
                            >
                                <span
                                    className={styles.dot}
                                ></span>
                                Lưu
                            </Button>
                        </div>
                        <Pages />
                    </Col>
                </Row>
            </div>
        </layoutContext.Provider>
    )
}

export default Layout

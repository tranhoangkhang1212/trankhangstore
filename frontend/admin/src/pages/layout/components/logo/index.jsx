import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useMount } from 'ahooks'
import { message } from 'antd'
import ImageUpload from '../../../../components/imageUploadLayout'
import { layoutContext } from '../../../layout'
import styles from './logo.module.less'

const key = process.env.REACT_APP_IMGBB_API_KEY
const imgbbUploader = require('imgbb-uploader')

const api = process.env.REACT_APP_API_URL
const apiUrl = api + '/api/layout/get'

const Logo = () => {
    let base64

    const context = useContext(layoutContext)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [image, setImage] = useState()
    const [logoDataPrimary, setLogoDataPrimary] = useState(
        []
    )

    const base64str = () =>
        new Promise(resolve => {
            return setTimeout(() => {
                resolve(base64)
            }, 1000)
        })
    // Barebone async function
    const myUrl = async name => {
        setLoading(true)
        return await imgbbUploader({
            apiKey: key,
            base64string: await base64str(),
            name: name,
        })
            .then(res => {
                context.setLayoutData([
                    ...context.layoutData,
                    {
                        type: 3,
                        image: res.url,
                    },
                ])
                message.success('Tải ảnh lên thành công')
            })
            .catch(() => {
                message.error('Tải ảnh lên thất bại!')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleUpload = () => {
        myUrl(data.file.name)
        let output
        const pegs = data.image.indexOf('base64,')
        output = data.image.slice(0, pegs + 7)
        base64 = data.image.replace(output, '')
    }

    const getlogoDataPrimary = async () => {
        setLoading(true)
        await axios
            .get(apiUrl + '?type=LOGO&hide=false&qty=1')
            .then(res => {
                const data = res.data
                setLogoDataPrimary(data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getlogoDataPrimary()
    })

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <h3 className={styles.title}>Logo</h3>
                {loading === false && (
                    <>
                        {logoDataPrimary?.map(
                            logo =>
                                logo.hide === 'false' &&
                                context.logoData?.map(
                                    logo => (
                                        <>
                                            <img
                                                src={
                                                    logo.image
                                                }
                                                alt='logo'
                                            />
                                        </>
                                    )
                                )
                        )}
                    </>
                )}
            </div>
            <div>
                <ImageUpload
                    buttonName='Tải lên'
                    loading={loading}
                    className={styles.upload_image}
                    image={image}
                    setImage={setImage}
                    setData={setData}
                    onClick={() => handleUpload()}
                    onChange={data =>
                        context.setLogoData(data)
                    }
                />
            </div>
        </div>
    )
}

export default Logo

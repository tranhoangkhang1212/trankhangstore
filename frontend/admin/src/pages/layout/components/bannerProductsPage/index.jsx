import React, { useState, useContext } from 'react'
import { message } from 'antd'
import ImageUpload from '../../../../components/imageUploadLayout'
import { layoutContext } from '../../../layout'
import styles from './banner.module.less'

const BannerProductsPage = () => {
    const context = useContext(layoutContext)

    const [image, setImage] = useState()
    const [imageData, setImageData] = useState([])

    const handleUpload = () => {
        imageData.map(image =>
            context.setLayoutData(prev => [
                ...prev,
                {
                    type: 5,
                    image: image.image,
                },
            ])
        )
        message.success('Tải ảnh lên thành công')
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                Banner Trang sản phẩm
            </h3>
            <div>
                <div className={styles.content}>
                    {context.productsBannerData?.map(
                        banner => (
                            <div className={styles.banner}>
                                <img
                                    src={banner.image}
                                    alt='banner'
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
            <ImageUpload
                multiple={true}
                buttonName='Tải lên'
                className={styles.upload_image}
                image={image}
                setImage={setImage}
                setImageData={setImageData}
                onClick={() => handleUpload()}
                onChange={data =>
                    context.setProductsBannerData(data)
                }
            />
        </div>
    )
}

export default BannerProductsPage

import React, { useState } from 'react'
import { Button } from 'antd'
import ImageUploading from 'react-images-uploading'
import styles from './image_upload.module.less'

const ImageUpload = props => {
    const maxNumber = 69

    const [disabled, setDisabled] = useState(true)

    const onChange = imageList => {
        // data for submit
        props.setImage(imageList)
        imageList.map(data => props.setData(data))
    }

    return (
        <div>
            <ImageUploading
                value={props.image}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey='data_url'
            >
                {({
                    imageList,
                    onImageUpload,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className={styles.upload_wrapper}>
                        <Button
                            className={styles.btn_upload}
                            style={
                                isDragging
                                    ? {
                                          color: 'red',
                                      }
                                    : undefined
                            }
                            onClick={() => {
                                onImageUpload()
                                setDisabled(false)
                            }}
                            {...dragProps}
                        >
                            Chọn ảnh
                        </Button>
                        <Button
                            loading={props.loading}
                            disabled={disabled}
                            className={styles.btn_upload}
                            onClick={props.onClick}
                        >
                            Tải lên
                        </Button>
                        <div
                            style={{
                                display: disabled
                                    ? 'block'
                                    : 'none',
                            }}
                            className={styles.image}
                        >
                            <img
                                src={props.imageUrl}
                                alt=''
                            />
                        </div>
                        {imageList.map((image, index) => (
                            <div
                                key={index}
                                className={styles.upload}
                            >
                                <img
                                    src={image['data_url']}
                                    alt=''
                                    width='100'
                                />
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}

export default ImageUpload

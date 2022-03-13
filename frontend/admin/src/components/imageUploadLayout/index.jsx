import React, { useState } from 'react'
import { Button } from 'antd'
import ImageUploading from 'react-images-uploading'
import styles from './image_upload.module.less'

const ImageUpload = props => {
    const maxNumber = 69

    const [disabled, setDisabled] = useState(true)

    const onChange = imageList => {
        // data for submit
        props?.setImage(imageList)
        imageList?.map(data => props.setData(data))
        props?.onChange(imageList)
        props?.setImageData(imageList)
    }

    return (
        <div>
            <ImageUploading
                multiple={props.multiple}
                value={props.image}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey='image'
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
                            {props.buttonName}
                        </Button>
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}

export default ImageUpload

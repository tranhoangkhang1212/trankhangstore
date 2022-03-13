import React from 'react'
import { Alert } from 'antd'

const Error = () => {
    return (
        <Alert
            style={{ marginTop: 12 }}
            message='Danh mục đang trong quá trình phát triển. Vui lòng quay lại sau!'
            type='warning'
            showIcon
            closable
        />
    )
}

export default Error

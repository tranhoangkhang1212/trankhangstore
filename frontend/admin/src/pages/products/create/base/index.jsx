import React, { useState } from 'react'
import { Input, Select } from 'antd'
import axios from 'axios'
import { useMount } from 'ahooks'
import styles from './base.module.less'
import './base.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/brands/all'

const { Option } = Select

const Base = props => {
    const [brandData, setBrandData] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllBrand = async () => {
        setLoading(true)
        await axios
            .get(api)
            .then(res => {
                const data = res.data
                setBrandData(data)
            })
            .finally(() => setLoading(false))
    }

    useMount(() => {
        getAllBrand()
    })

    const handleInputChange = e => {
        const value = e.target.value
        const name = e.target.name
        props.setProductData({
            ...props.productData,
            [name]: value,
        })
    }

    const handleSelectChange = value => {
        props.setProductData({
            ...props.productData,
            brandId: value,
        })
    }

    return (
        <div>
            <h2>Thông tin cơ bản</h2>
            <div className={styles.product_data}>
                <label htmlFor='name'>Tên sản phẩm</label>
                <Input
                    id='name'
                    autocomplete='off'
                    onChange={handleInputChange}
                    name='name'
                />
                <div className={styles.price}>
                    <div>
                        <label htmlFor='price'>Giá</label>
                        <Input
                            autocomplete='off'
                            type='number'
                            onChange={handleInputChange}
                            name='price'
                        />
                    </div>
                    <div>
                        <label htmlFor='discount'>
                            Giảm giá (%)
                        </label>
                        <Input
                            autocomplete='off'
                            type='number'
                            onChange={handleInputChange}
                            name='discount'
                        />
                    </div>
                    <div>
                        <label htmlFor='qty'>
                            Số lượng
                        </label>
                        <Input
                            autocomplete='off'
                            type='number'
                            onChange={handleInputChange}
                            name='qty'
                        />
                    </div>
                </div>
            </div>
            <div className={styles.brand_rate}>
                <div>
                    <p className={styles.brand}>Chọn hãng</p>
                    <Select
                        className={styles.select}
                        placeholder='Chọn thương hiệu'
                        optionFilterProp='children'
                        onChange={handleSelectChange}
                    >
                        {loading === false &&
                            brandData.map(brand => (
                                <Option
                                    onChange={
                                        handleSelectChange
                                    }
                                    value={brand.id}
                                    name='brandId'
                                >
                                    {brand.name}
                                </Option>
                            ))}
                    </Select>
                </div>
                <div className={styles.rate}>
                    <label htmlFor='rate'>
                        Đánh giá mặc định
                    </label>
                    <Input
                        autocomplete='off'   
                        type='number'                     
                        onChange={handleInputChange}
                        name='rate'
                    />
                </div>
            </div>
        </div>
    )
}

export default Base

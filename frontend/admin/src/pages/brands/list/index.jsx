import React, { useState } from 'react'
import axios from 'axios'
import { useMount } from 'ahooks'
import { List, Popconfirm, message } from 'antd'
import moment from 'moment'
import Create from '../create'
import Update from '../update'
import styles from './list.module.less'

const api = process.env.REACT_APP_API_URL
const apiGetAllBrand = api + '/api/brands/all'
const apiDeleteBrand = api + '/api/brands/delete?id='

const ListBrands = () => {
    const [brandsData, setBrandsData] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllBrands = async () => {
        setLoading(true)
        await axios
            .get(apiGetAllBrand)
            .then(res => {
                const data = res.data
                setBrandsData(data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const handleDeleteBrandApi = id => {
        axios
            .delete(apiDeleteBrand + id)
            .catch(() => message.error('Vui lòng thử lại!'))
            .finally(() => {
                getAllBrands()
                message.success('Xóa thành công')
            })
    }

    useMount(() => {
        getAllBrands()
    })

    return (
        <div className={styles.container}>
            <List
                loading={loading}
                pagination={false}
                grid={{
                    xl: 4,
                    lg: 4,
                    md: 2,
                    sm: 2,
                    xs: 2,
                }}
                dataSource={brandsData}
                renderItem={brand => (
                    <>
                        <div className={styles.item}>
                            <div className={styles.image}>
                                <img
                                    src={brand.image}
                                    alt=''
                                />
                            </div>
                            <h3>Tên: {brand.name}</h3>
                            <span>
                                Ngày tạo:{' '}
                                {moment(
                                    brand.created
                                ).format(
                                    'DD-MM-YYYY, HH:mm'
                                )}
                            </span>
                            <Popconfirm
                                title='Bạn có chắc chắn muốn xóa?'
                                onConfirm={() =>
                                    handleDeleteBrandApi(
                                        brand.id
                                    )
                                }
                                okText='Xóa'
                                cancelText='Hủy'
                            >
                                <div
                                    className={
                                        styles.btn_delete
                                    }
                                >
                                    <i class='far fa-times-circle'/>
                                </div>
                            </Popconfirm>
                            <Update
                                id={brand.id}
                                reCallApi={() =>
                                    getAllBrands()
                                }
                            />
                        </div>
                    </>
                )}
            />
            <Create reCallApi={() => getAllBrands()} />
        </div>
    )
}

export default ListBrands

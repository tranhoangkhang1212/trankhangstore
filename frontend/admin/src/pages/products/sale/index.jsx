import React, { useState } from 'react'
import { useMount } from 'ahooks'
import axios from 'axios'
import {
  Table,
  Checkbox,
  message,
  Button,
  Input,
} from 'antd'
import styles from './sale.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const apiGetAllProduct = apiUrl + '/api/products/all'
const apiUpdate = apiUrl + '/api/products/update-sale'
const apiSearchProducts = apiUrl + '/api/products/search'

const { Column } = Table

const Sale = () => {

  let keyword

  const [loading, setLoading] = useState(false)
  const [productsData, setProductsData] = useState([])
  const [productSelected, setProductSelected] = useState([])

  const getAllProducts = async () => {
    setLoading(true)
    await axios
      .get(apiGetAllProduct)
      .then(res => setProductsData(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const getProductsByName = () => {
    axios
      .get(apiSearchProducts + `?q=${keyword}`)
      .then(res => setProductsData(res.data))
      .catch(() => message.warning('Không tìm thấy sản phẩm phù hợp'))
  }

  const updateProductsSale = () => {
    axios
      .patch(apiUpdate, productSelected)
      .then(() =>
        message.success('Cập nhật thành công')
      )
      .catch(() => message.error('Vui lòng thử lại'))
  }

  useMount(() => {
    getAllProducts()
  })

  const onChange = e => {
    const id = e.target.value
    setProductSelected(prev => [
      ...prev,
      {
        id: id,
        sale: 'true',
      },
    ])
  }

  const onSearch = value => {
    keyword = value
    getProductsByName()
  }

  return (
    <div className={styles.products}>
      <div className={styles.search}>
        <Input.Search
          placeholder='Nhập tên sản phẩm'
          onSearch={onSearch}
          style={{ width: '50%' }}
        />
        <Button
          className={styles.save}
          type='primary'
          onClick={updateProductsSale}
        >
          Lưu
        </Button>
      </div>
      <Table
        loading={loading}
        dataSource={productsData}
      >
        <Column
          width={30}
          key='check'
          render={product => (
            <Checkbox
              value={product.id}
              onChange={onChange}
            />
          )}
        />
        <Column
          title='ID'
          key='id'
          render={product => (
            <span>#{product.id}</span>
          )}
        />
        <Column
          title='Tên'
          key='name'
          dataIndex='name'
        />
        <Column
          title='Hình ảnh'
          key='image'
          render={product => (
            <img
              src={product.imageUrl}
              alt={product.name}
            />
          )}
        />
        <Column
          title='Trạng thái'
          key='sale'
          render={product => (
            <span>
              {product.sale === 'true'
                ? 'Sale'
                : 'Bình thường'}
            </span>
          )}
        />
      </Table>
    </div>
  )
}

export default Sale

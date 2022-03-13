import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { Input } from 'antd'
import debounce from 'lodash.debounce'
import {
    formatCash,
    discount,
} from '../../../../../public/function'
import styles from './handle_search.module.less'

const apiUrl = process.env.REACT_APP_API_URL
const api = apiUrl + '/api/products/search'

const SearchDebounce = () => {
    const { Search } = Input
    const [dropdownOptions, setDropdownOptions] = useState(
        []
    )
    const [keyword, setKeyword] = useState('')
    const [visible, setVisible] = useState(false)

    const onSearch = value => {
        window.location.href = `/search?${value}`
    }

    function fetchDropdownOptions(key) {
        axios
            .get(api + `?q=${key}`)
            .then(res => setDropdownOptions(res.data))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDropDown = useCallback(
        debounce(
            nextValue => fetchDropdownOptions(nextValue),
            0
        ),
        []
    )

    function handleInputOnchange(e) {
        const { value } = e.target
        setKeyword(value)
        debounceDropDown(value)
    }

    return (
        <div>
            <Search
                value={keyword}
                onFocus={() => setVisible(true)}
                onChange={handleInputOnchange}
                onSearch={onSearch}
                placeholder='Nhập nội dung cần tìm...'
                enterButton='Search'
                size='large'
            />
            <div
                style={{
                    display: visible ? 'block' : 'none',
                }}
            >
                {dropdownOptions.length > 0 && (
                    <div className={styles.dropdown}>
                        <div className={styles.title}>
                            <span>Sản phẩm được gợi ý</span>
                            <i
                                onClick={() =>
                                    setVisible(false)
                                }
                                class='fas fa-times'
                            />
                        </div>
                        {dropdownOptions.map(item => (
                            <div
                                onClick={() =>
                                    setVisible(false)
                                }
                            >
                                <div
                                    className={
                                        styles.content
                                    }
                                >
                                    <div>
                                        <img
                                            src={
                                                item.imageUrl
                                            }
                                            alt={item.name}
                                        />
                                    </div>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <span
                                            style={{
                                                textDecoration:
                                                    'line-through',
                                            }}
                                        >
                                            {formatCash(
                                                item.price
                                            )}
                                        </span>
                                        <p>
                                            {formatCash(
                                                discount(
                                                    item.price,
                                                    item.discount
                                                )
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default SearchDebounce

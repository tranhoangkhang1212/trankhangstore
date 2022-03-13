import React from 'react'
import { Link } from 'react-router-dom'
import './navigation.less'

const Navigation = () => {
    const nav = [
        {
            path: '#',
            name: 'Trang chủ',
            className: 'active',
        },
        {
            path: '#',
            name: 'Giới thiệu',
        },
        {
            path: '#',
            name: 'Sản phẩm',
        },
        {
            path: '#',
            name: 'Tin tức',
        },
        {
            path: '#',
            name: 'Liên hệ',
        },
    ]

    return (
        <nav className='navigation'>
            <ul>
                {nav.map((item, key) => (
                    <li key={key}>
                        <Link
                            className={item.className}
                            to={item.path}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation

import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.less'

const Navigation = () => {
    const nav = [
        {
            path: '/',
            name: 'Trang chủ',
        },
        {
            path: '/about',
            name: 'Giới thiệu',
        },
        {
            path: '/products',
            name: 'Sản phẩm',
        },
        {
            path: '/news',
            name: 'Tin tức',
        },
        {
            path: '/contact',
            name: 'Liên hệ',
        },
        {
            path: '/question',
            name: 'Hỏi đáp',
        },
    ]

    return (
        <nav className='navigation'>
            <ul>
                {nav.map((item, key) => (
                    <li key={key}>
                        <NavLink to={item.path}>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation

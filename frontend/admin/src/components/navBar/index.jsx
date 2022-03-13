import React, { useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMount } from 'ahooks'
import User from './user'
import styles from './menu.module.less'

const { SubMenu } = Menu

// submenu keys of first level
const rootSubmenuKeys = [
    'sub1',
    'sub2',
    'sub3',
    'sub4',
    'sub5',
    'sub6',
    'sub7',
]

const api = process.env.REACT_APP_API_URL
const apiUrl = api + '/api/layout/get'

const NavBar = () => {
    const [logoData, setLogoData] = useState([])

    const [openKeys, setOpenKeys] = useState(['sub1'])
    const onOpenChange = keys => {
        const latestOpenKey = keys.find(
            key => openKeys.indexOf(key) === -1
        )
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(
                latestOpenKey ? [latestOpenKey] : []
            )
        }
    }

    const getLogoData = async () => {
        axios
            .get(apiUrl + '?type=LOGO&hide=false&qty=1')
            .then(res => {
                const data = res.data
                setLogoData(data)
            })
            .catch(err => console.log(err))
    }

    useMount(() => {
        getLogoData()
    })

    return (
        <nav>
            <Menu
                openKeys={openKeys}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                onOpenChange={onOpenChange}
                className={styles.menu}
                theme='dark'
                style={{ width: 256 }}
                mode='inline'
            >
                {logoData?.map(logo => (
                    <div className={styles.logo}>
                        <Link to='/'>
                            <img src={logo.image} alt='' />
                        </Link>
                        <a href='https://trankhang--store.web.app/' target='_blank' rel="noreferrer">
                            <i class='far fa-eye'/>
                        </a>
                    </div>
                ))}
                <SubMenu
                    default
                    key='sub1'
                    title='Đơn hàng'
                >
                    <Menu.Item key='1'>
                        <Link to='/orders'>
                            Danh sách đơn hàng
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='sub2' title='Sản phẩm'>
                    <Menu.Item key='2'>
                        <Link to='/products'>
                            Danh sách
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Link to='/products/sale'>
                            Sản phẩm sale
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Link to='/product/create'>
                            Thêm mới
                        </Link>
                    </Menu.Item>
                    <SubMenu key='sub2-3' title='Bài viết'>
                        <Menu.Item key='5'>
                            Thêm mới
                        </Menu.Item>
                        <Menu.Item key='6'>
                            Danh sách
                        </Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key='sub4' title='Thương hiệu'>
                    <Menu.Item key='8'>
                        <Link to='/brands'>Danh sách</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='sub5' title='Bài viết'>
                    <Menu.Item key='11'>
                        <Link to='/posts'>Danh sách</Link>
                    </Menu.Item>
                    <Menu.Item key='12'>
                        <Link to='/posts/create'>
                            Thêm mới
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='sub6' title='Giao diện'>
                    <Menu.Item key='14'>
                        <Link to='/layout'>
                            Logo & Banner
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='15'>
                        <Link to='/layout/posts'>
                            Bài viết giới thiệu
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='sub7' title='Người dùng'>
                    <Menu.Item key='17'>
                        <Link to='/users'>
                            Danh sách người dùng
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='18'>
                        Danh sách đăng ký liên hệ
                    </Menu.Item>
                </SubMenu>
                <User />
            </Menu>
        </nav>
    )
}

export default NavBar

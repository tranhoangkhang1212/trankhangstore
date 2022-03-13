import { Navigate } from 'react-router-dom'

import Create from './products/create'
import ListOrder from './orders/listOrder'
import List from './products/list'
import Update from './products/update'
import Brands from './brands'
import PostCreate from './posts/create'
import ListPost from './posts/list'
import PostUpdate from './posts/update'
import ListUser from './users/list'
import Layout from './layout'
import LayoutPost from './layout/components/posts/List'
import Sale from './products/sale'
import Error from './404'

export const routes = [
    {
        path: '/product/create',
        element: <Create />,
    },
    {
        path: '/products',
        element: <List />,
    },
    {
        path: '/product/update/:id',
        element: <Update />,
    },
    {
        path: '/products/sale',
        element: <Sale />,
    },
    {
        path: '/orders',
        element: <ListOrder />,
    },
    {
        path: '/brands',
        element: <Brands />,
    },
    {
        path: '/posts/create',
        element: <PostCreate />,
    },
    {
        path: '/posts',
        element: <ListPost />,
    },
    {
        path: '/post/update/:id',
        element: <PostUpdate />,
    },
    {
        path: '/users',
        element: <ListUser />,
    },
    {
        path: '/layout',
        element: <Layout />,
    },
    {
        path: '/layout/posts',
        element: <LayoutPost />,
    },
    {
        path: '*',
        element: <Error />,
    },
    {
        path: '*',
        element: <Navigate to='/orders' />,
    },
]

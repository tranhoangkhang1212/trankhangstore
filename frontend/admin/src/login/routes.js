import { Navigate } from 'react-router-dom'
import Layout from './layout'

export const routes = [
    {
        path: '/login',
        element: <Layout />,
    },
    {
        path: '/',
        element: <Navigate to='/login' />,
    },
]

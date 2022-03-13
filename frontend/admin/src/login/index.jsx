import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'

const Login = () => {
    const navigation = useRoutes(routes)

    return (
        <>
            {navigation}
        </>
    )
}

export default Login

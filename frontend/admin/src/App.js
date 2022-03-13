import React from 'react'
import dotenv from 'dotenv'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.less'
import Pages from './pages'
import Login from './login'

dotenv.config()

const token = sessionStorage.getItem('token')

function App() {
    ;(value => {
        if (
            token ||
            window.location.pathname === '/login'
        ) {
            return value
        } else {
            window.location.pathname = '/login'
        }
    })()

    return (
        <>
            <Router>
                {!token && <Login />}
                {token && <Pages />}
            </Router>
        </>
    )
}

export default App

import React from 'react'
import dotenv from 'dotenv'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.less'
import Pages from './pages'
import ScrollToTop from './components/scrollToTop'

dotenv.config()

function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Pages />
            </Router>
        </>
    )
}

export default App

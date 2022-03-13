import Home from './home'
import About from './about'
import Contact from './contact'
import Products from './products'
import Error from './404'
import Search from './search'

export const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/products',
        element: <Products />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '*',
        element: <Error />,
    },
]

import Home from './home'
import About from './about'
import Contact from './contact'
import Products from './products'
import News from './news'
import Detail from './news/detail'
import ProductDetail from './products/productDetail'
import Cart from './cart'
import Search from './search'
import Login from './account/login'
import Register from './account/register'
import Orders from './orders'
import Error from './404'

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
        path: '/news',
        element: <News />,
    },
    {
        path: '/news/detail/:id',
        element: <Detail />,
    },
    {
        path: '/product/details/:id',
        element: <ProductDetail />,
    },
    {
        path: '/cart',
        element: <Cart />,
    },
    {
        path: '/products/:name',
        element: <Products />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '/search/:params',
        element: <Search />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/orders',
        element: <Orders />,
    },
    {
        path: '*',
        element: <Error />,
    },
]

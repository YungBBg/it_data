import React from 'react'
import ReactDOM from 'react-dom/client'
import { Link, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Button from '@mui/material/Button'
import { ShoppingCartProvider } from './component/context/ShoppingCartContext.jsx'

import MainLayout from './component/MainLayout/index.jsx'
import RestaurantLayout from './component/Restaurant_Operation_Process/RestaurantLayout/index.jsx'


//order
import RestaurantList from './component/MainContent/RestaurantList/RestaurantList.jsx'
import MoreRestaurantList from './component/MainContent/RestaurantList/MoreRestaurantList.jsx'
import FoodList from './component/MainContent/RestaurantList/FoodList.jsx'
import { FoodSettingProvider } from './component/context/FoodSettingContext.jsx'
import Checkout from './component/MainContent/Cart/index.jsx'
import Complain from './component/Complain/Complain.jsx'

//order record
import OrderRecordList from './component/OrderRecordList'

//favorite
import FavoriteList from './component/FavoriteList'
// import { SearchRestaurantProvider } from './component/context/SearchRestaurantContext.jsx'
import Login from './component/LoginRegister/Login.jsx'

//Delivery_Process
import DeliveryLayout from './component/Delivery_Process/DeliveryLayout/index.jsx'
import DeliveryChatRoom from './component/Delivery_Process/Chart_Room/index.jsx'
import Record from './component/Delivery_Process/Record/record.jsx'
import FoodOrder from './component/Delivery_Process/FoodOrder/FoodOrder.jsx'

//Admin_Process
import AdminLayout from './component/Admin_Process/AdminLayout/index.jsx'


// ChatRoom
import ChatRoom from './component/ChatRoom';
import Payment from './component/Payment';

// Menus page
import Menus from './component/Restaurant_Operation_Process/Menu_Management/Menus';
import NewMenu from './component/Restaurant_Operation_Process/Menu_Management/NewMenu';
import ModifyMenu from './component/Restaurant_Operation_Process/Menu_Management/ModifyMenu';

import Restaurants from './component/Restaurant_Operation_Process/Restaurant_Management/Restaurants';
import Orders from './component/Restaurant_Operation_Process/Order_Management/Orders';

import Chart from './component/Restaurant_Operation_Process/Chart';
import AdminChatRoom from './component/Restaurant_Operation_Process/Admin_Chat_Room';
import OrdersAccept from './component/Restaurant_Operation_Process/Order_Management/OrderAccept'
import OrdersModify from './component/Restaurant_Operation_Process/Order_Management/OrderModify'

const router = createBrowserRouter([
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/UserType",
        element: "/src/index2.html",
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            // order
            {
                path: "/",
                element: <RestaurantList />,
            },
            {
                path: "/RestaurantList",
                element: <RestaurantList />,
            },
            {
                path: "/MoreRestaurantList",
                element: <MoreRestaurantList />,
            },
            {
                path: "/FoodList",
                element: <FoodList />
            },
            {
                path: "/Checkout",
                element: <Checkout />
            },
            {
                path: "/OrderRecordList",
                element: <OrderRecordList />
            },

            {
                path: "/FavoriteList",
                element: <FavoriteList />
            },
            {
                path: "/ChatRoom",
                element: <ChatRoom />
            },
            {
                path: "/Payment",
                element: <Payment />
            },
            {
                path: "/Complain",
                element: <Complain />
            },
        ],
    },
    {
        path: "/restaurantAdmin",
        element: <RestaurantLayout />,
        children: [
            // menus
            {
                path: "/restaurantAdmin",
                element: <Menus />,
            },
            {
                path: "/restaurantAdmin/newMenu",
                element: <NewMenu />,
            },
            {
                path: "/restaurantAdmin/modifyMenu",
                element: <ModifyMenu />,
            },
            // restaurant
            {
                path: "/restaurantAdmin/restaurants",
                element: <Restaurants />,
            },
            {
                path: "/restaurantAdmin/orders",
                element: <Orders />,
            },
            {
                path: "/restaurantAdmin/ordersAccept",
                element: <OrdersAccept />,
            },
            {
                path: "/restaurantAdmin/ordersModify",
                element: <OrdersModify />,
            },
            {
                path: "/restaurantAdmin/adminChatRoom",
                element: <AdminChatRoom />
            },
            {
                path: "/restaurantAdmin/chart",
                element: <Chart />
            },


        ],
    },

    {
        path: "/Admin",
        element: <AdminLayout />,
        children: [

        ],
    },

    {
        path: "/deliveryUser",
        element: <DeliveryLayout />,
        children: [
            {
                path: "/deliveryUser",
                element: <FoodOrder />,
            },
            {
                path: "/deliveryUser/FoodOrder",
                element: <FoodOrder />,
            },
            {
                path: "/deliveryUser/Record",
                element: <Record />,
            },
            {
                path: "/deliveryUser/Chart_Room",
                element: <DeliveryChatRoom />
            },
        ],
    },
]);

export default function App() {
    const loginInfo = localStorage.getItem('loginInfo');
    return (
        (loginInfo) ?
            <ShoppingCartProvider >
                <FoodSettingProvider>
                    <RouterProvider router={router} />
                </FoodSettingProvider>
            </ShoppingCartProvider>
            :
            <Login />
    )
}

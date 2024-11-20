import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import LoyaltyIcon from '@mui/icons-material/Loyalty';
// // import {AccountCircleIcon, LoyaltyIcon, FavoriteIcon, LogoutIcon } from '@mui/icons-material';
// import { PiCallBellFill } from 'react-icons/pi';
// import { IoTimerSharp } from 'react-icons/io5';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PaymentIcon from '@mui/icons-material/Payment';
import { TbReceipt2 } from 'react-icons/tb'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const SideBarItemList = [
    {
        item: 'Order',
        path: "/RestaurantList"
    },
    {
        item: 'Checkout',
        path: "/Checkout"
    },
    {
        item: 'Order Record',
        path: "/OrderRecordList"
    },
    {
        item: 'Favorite',
        path: "/FavoriteList"
    },
    {
        item: 'User Information',
        path: "/src/component/LoginRegister/Modify_User_Data.html"
    },
    {
        item: 'Payment',
        path: "/Payment"
    },
    {
        item: 'Support',
        path: "/ChatRoom"
    },
    {
        item: 'Logout',
        path: "/Login"
    },
    
]

export default function SideBarItem() {
    return (
        <List>
            {SideBarItemList.map((sItem, index) => (
                <ListItem key={sItem.item + index} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            ":hover": { bgcolor: "#fef9e8" }
                        }}
                        onClick={sItem.path == "/Login" ? ()=>{localStorage.removeItem("loginInfo")} : null}
                        href={sItem.path}
                    >

                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {{
                                'Order': <RestaurantIcon size={24} />,
                                'Checkout': <ShoppingBasketOutlinedIcon />,
                                'Order Record': <TbReceipt2 size={24} />,
                                'Favorite': <FavoriteIcon />,
                                'User Information': <AccountCircleIcon />,
                                'Payment': <PaymentIcon />,
                                'Support': <SupportAgentIcon />,
                                'Logout': <LogoutIcon />,
                            }[sItem.item]}
                        </ListItemIcon>

                        <ListItemText primary={sItem.item} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}


import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PaymentIcon from '@mui/icons-material/Payment';
import { TbReceipt2 } from 'react-icons/tb'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import { HiMiniQueueList } from "react-icons/hi2";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

const SideBarItemList = [
    {
        item: 'Receive order',
        path: "/deliveryUser/FoodOrder"
    },
    {
        item: 'Orders Records',
        path: "/deliveryUser/Record"
    },
    {
        item: 'Support',
        path: "/deliveryUser/Chart_Room"
    },
    {
        item: 'Profile',
        path: "/src/component/Delivery_Process/Delivery_Profile/Modify_User_Data.html"
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
                            ":hover": { bgcolor: "#EDF5FD" }
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
                                'Receive order': <FastfoodIcon size={24} />,
                                'Orders Records': <ChecklistRtlIcon size={24} />,
                                'Support': <SupportAgentIcon />,
                                'Profile': <PermContactCalendarIcon />,
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


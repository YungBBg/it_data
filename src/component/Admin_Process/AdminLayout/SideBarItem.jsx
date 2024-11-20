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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import EditNoteIcon from '@mui/icons-material/EditNote';

const SideBarItemList = [
    {
        item: 'Verify Account',
        path: "/deliveryUser/FoodOrder"
    },
    {
        item: 'CURD Account',
        path: "/deliveryUser/Record"
    },
    {
        item: 'Review',
        path: "/deliveryUser/Chart_Room"
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
                                'Verify Account': <AccountBalanceIcon size={24} />,
                                'CURD Account': <EditNoteIcon size={24} />,
                                'Review': <ViewCarouselIcon />,
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

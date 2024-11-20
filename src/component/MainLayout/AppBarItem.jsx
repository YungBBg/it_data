
import * as React from 'react';
// MUI
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

import { useShoppingCart } from "../context/ShoppingCartContext"
import { Button } from '@mui/material';

export default function AppBarItem({ handleToggleDrawer }) {

    const { openCart, cartQuantity } = useShoppingCart()
    const [language, setLanguage] = React.useState("English");

    const handleLanguage = () => {
        if (language == "English") {
            setLanguage("中文");
        } else {
            setLanguage("English");
        }
    }

    return (
        <>
            {/* menu icon */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleToggleDrawer}
                edge="start"
                sx={{
                    marginRight: 5,
                }}
            >
                <MenuIcon sx={{ color: '#322805' }} />
            </IconButton>

            {/* title */}
            <Link href="/RestaurantList" underline="none" display={'flex'} alignItems={'center'}>
                <Avatar src='src/assets/img/logo/topbar_logo.jpeg' sx={{ width: 50, height: 50, mr: 1, boxShadow: '0px 0px 5px #98780F', p: 1 }} />

                <Typography
                    sx={{
                        '@media (max-width: 600px)': {
                            fontSize: '0rem',
                        },
                        '@media (min-width: 601px)': {
                            fontSize: '1.5rem',
                        },
                        color: "#322805",
                        fontWeight: 'bold',
                    }}
                    noWrap
                    component="div"
                >
                    Yummy Restaurant Group Limited
                </Typography>
            </Link>


            <Box sx={{ flexGrow: 1 }} />
            {/* updating */}
            <Box ml={2} mr={1} width={110} >
                <Button   sx={{ color: 'black', ":hover":{bgcolor:"orange"} }}  startIcon={<TranslateIcon />}
                    onClick={() => { handleLanguage() }}>
                    <Typography noWrap={true}>
                        {language}
                    </Typography>
                </Button>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={openCart}
                >
                    <Badge badgeContent={cartQuantity} color="error">
                        <ShoppingBasketOutlinedIcon sx={{ color: '#322805' }} />
                    </Badge>
                </IconButton >
            </Box>
        </>
    );
};
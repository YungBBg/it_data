
import * as React from 'react';
// MUI
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 50,
    height: 50,
    marginRight: 5,
    boxShadow: '0px 3px #D19C2A',
    transform: 'translate(0px, -2px)',

    padding: 10,
    background: "#FEC81A",

    transition: '0.5s ease',
    '&:hover': {
        transform: 'translate(0px, 0px)',
        boxShadow: '0px 0px #D19C2A',
    },
    '@media (max-width: 600px)': {
        width: 40,
        height: 40,
    },
})
);

export default function AppBarItem({ handleToggleDrawer }) {

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
                onClick={handleToggleDrawer}
                edge="start"
                disableRipple={true} 

                sx={{
                    marginRight: 5,
                    background: "#FFB6C1",
                    boxShadow: "0px 4px #FF69B4",
                    transform: 'translate(0px, -2px)',
                    transition: '0.2s ease',
                    ":hover": {
                        background: "#FF69B4",
                        boxShadow: "0px 0px #FF69B4",
                        transform: 'translate(0px, 0px)',
                    },
                }}
            >
                <MenuIcon sx={{ color: '#EDF5FD' }} />
            </IconButton>

            {/* title */}
            <Link href="/deliveryUser" underline="none" display={'flex'} alignItems={'center'}>
                <StyledAvatar src='/src/assets/img/logo/topbar_logo.jpeg' />

                <Typography
                    sx={{
                        '@media (max-width: 600px)': {
                            fontSize: '0rem',
                        },
                        '@media (min-width: 601px)': {
                            fontSize: '1.5rem',
                        },
                        color: "#FFF9FA",
                        fontWeight: 'bold',
                    }}
                    noWrap
                    component="div"
                >
                    Yummy Restaurant Group Limited
                </Typography>
            </Link>


            <Box sx={{ flexGrow: 1 }} />
            <Box ml={2} mr={1} width={110} >
                <Button 
                disableRipple={true} 
             
                sx={{
                    marginRight: 5,
                    color: 'snow',
                    background: "#FFB6C1",
                    boxShadow: "0px 4px #FF69B4",
                    transform: 'translate(0px, -2px)',
                    transition: '0.2s ease',
                    ":hover": {
                        background: "#FF69B4",
                        boxShadow: "0px 0px #FF69B4",
                        transform: 'translate(0px, 0px)',
                    },
                    
                    
                }}
                    startIcon={<TranslateIcon />}
                    onClick={() => { handleLanguage() }}
                >
                    <Typography noWrap={true}>
                        {language}
                    </Typography>
                </Button>
            </Box>
        </>
    );
};
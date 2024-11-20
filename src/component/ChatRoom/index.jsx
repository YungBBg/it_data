import { Box, Stack, Avatar, Divider, TextField, Button, Typography, Grid, Badge } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import $ from "jquery"

export default function ChatRoom() {

    const [userInput, setUserInput] = useState("")

    const [messages, setMessages] = useState([{ userType: "cust", message: "hello" }, { userType: "cs", message: "hello?" }]);

    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => { clearInterval(timerId); }

    }, [])

    useEffect(() => {
        $("#main").scrollTop($("#main").prop("scrollHeight"));
    }, [messages])

    const tick = () => {
        setTime(new Date().toLocaleTimeString());
    }

    const sendMessage = () => {
        if (userInput == "") {
            return;
        }
        console.log(userInput)
        const newMessage = { userType: "cust", message: userInput };
        setMessages((prevMessage) => [...prevMessage, newMessage]);
        setUserInput("")
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));


    return (
        <>
            <Box>
                <Grid container direction="row" justifyContent='center' alignItems='center' >
                    <Grid item {...{ xs: 12, md: 8, lg: 7, xl: 6 }} >

                        <Stack spacing={1}
                            sx={{
                                borderRadius: 2,
                                border: '1px solid #fed85e',
                                bgcolor: '#fef4d1',
                                padding: 2,
                                minWidth: 500,
                                minHeight: 300,
                                height: '80vh',
                                overflow: 'hidden',
                            }}
                        >
                            <Stack direction={'row'} spacing={2} justifyItems={'center'} alignItems={'center'} marginRight={10}>

                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar sx={{ bgcolor: "#fed85e", width: 56, height: 56 }}>
                                        <SupportAgentIcon sx={{ color: '#4c3c07', width: 50, height: 50 }} />
                                    </Avatar>
                                </StyledBadge>

                                <Box>
                                    <Typography>Customer Service Officer</Typography>
                                    <Typography variant="caption" color='second'>{time}</Typography>
                                </Box>
                            </Stack>

                            <Divider variant='middle'></Divider>

                            <Grid id="main" container sx={{
                                overflow: 'auto',
                                height: 600,
                                '&::-webkit-scrollbar': { width: '0.4rem', WebkitAppearance: 'none' },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0 0 0 / 0.25)',
                                },
                            }}>
                                <Grid item xs={12} >
                                    {messages.map((m, index) => (
                                        <Typography
                                            key={index}
                                            minWidth={200}
                                            ml={m.userType === 'cust' ? { xs: '40%', md: '50%', lg: '60%', xl: '70%' } : 1}
                                            mr={m.userType === 'cs' ? { xs: '40%', md: '50%', lg: '60%', xl: '70%' } : 1}
                                            mt={1}
                                            bgcolor={m.userType === 'cust' ? "#eaeadf" : "#ece9d6"}
                                            borderRadius={5}

                                            sx={{
                                                p: 1, pl: 2, mt: 1, wordWrap: 'break-word',
                                                overflowWrap: 'break-word',
                                            }}>{m.message}</Typography>
                                    ))}
                                </Grid>
                            </Grid>


                            <TextField
                                color='warning'
                                value={userInput}
                                onChange={(event) => setUserInput(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        sendMessage();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button onClick={sendMessage} color='warning' sx={{ borderRadius: 100 }}>
                                            <SendIcon />
                                        </Button>
                                    )
                                }}>
                            </TextField>

                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
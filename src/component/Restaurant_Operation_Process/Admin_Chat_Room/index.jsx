import { Box, Stack, Avatar, Divider, TextField, Button, Typography, Grid, Badge, Card, Chip, Paper, InputBase, CardActionArea } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import $ from "jquery"
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';

export default function AdminChatRoom() {

    const [userInput, setUserInput] = useState("")
    const users = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

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
            <Grid container direction="row" justifyContent='center' alignItems='center' >
                <Grid item sx={{ xs: 12 }} >
                    <Stack direction="row">
                        <Stack
                            width={300}
                            sx={{
                                borderRadius: '10px 0 0 10px',
                                border: '1px solid #D7DFE6',
                                borderRight: 0,
                                bgcolor: 'aliceblue',
                                minHeight: 300,
                                height: '80vh',
                                overflow: 'auto',
                                '&::-webkit-scrollbar': { width: '0.4rem', WebkitAppearance: 'none' },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0 0 0 / 0.25)',
                                },
                            }}
                        >
                            <Stack
                                direction={'row'}
                                spacing={2}
                                alignItems={'center'}
                                p={1}
                            >
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 8px', display: 'flex', alignItems: 'center', width: 400 }}
                                >
                                    <SearchIcon />
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Client Name"
                                    />
                                </Paper>
                            </Stack>

                            {users.map((_, index) => {
                                return (
                                    <>
                                        <CardActionArea>
                                            <Card key={index} sx={{ p: 1, h: 200, borderRadius: '0px', boxShadow: 0, ":hover": { bgcolor: "aliceblue", cursor: "pointer" } }}>
                                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                                                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                                        <Avatar sx={{ bgcolor: "#fed85e", width: 56, height: 56 }}>
                                                            <PersonIcon sx={{ color: '#4c3c07', width: 50, height: 50 }} />
                                                        </Avatar>
                                                        <Stack>
                                                            <Typography variant="h6" >
                                                                Sky Wong
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                hello
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                                                            19:33
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>

                                                            {(index % 3 == 1) ?
                                                                <Chip label="10" size="small" /> :
                                                                (index % 3 == 0) ?
                                                                    <DoneIcon sx={{ fontSize: "18px", color: "grey" }} /> : <DoneAllIcon sx={{ fontSize: "18px", color: "grey" }} />
                                                            }
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Card>
                                        </CardActionArea>
                                        <Divider variant="inset" />
                                    </>
                                )
                            })}
                        </Stack>

                        <Stack spacing={1}
                            sx={{
                                borderRadius: '0 10px 10px 0',
                                border: '1px solid #D7DFE6',
                                bgcolor: 'aliceblue',
                                padding: 2,
                                minWidth: 600,
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
                                        <PersonIcon sx={{ color: '#4c3c07', width: 50, height: 50 }} />
                                    </Avatar>
                                </StyledBadge>

                                <Box>
                                    <Typography>Sky Wong</Typography>
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
                                            ml={m.userType === 'cust' ? { xs: '40%', md: '50%', lg: '60%' } : 1}
                                            mr={m.userType === 'cs' ? { xs: '40%', md: '50%', lg: '60%'} : 1}
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
                                size='small'
                                color='primary'
                                value={userInput}
                                onChange={(event) => setUserInput(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        sendMessage();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button onClick={sendMessage} color='primary' sx={{ borderRadius: 100 }}>
                                            <SendIcon />
                                        </Button>
                                    )
                                }}>
                            </TextField>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid >
        </>
    )
}
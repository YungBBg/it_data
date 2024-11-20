import { Box, Button, FormControlLabel, Typography, Card, Stack, Radio, RadioGroup, Grid } from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

import { FaCcMastercard, FaCcVisa, FaPaypal } from 'react-icons/fa6'
import EditOutlined from '@mui/icons-material/EditOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import { usePaymentOptionForm } from '/src/component/context/PaymentOptionFormContext';



export default function PaymentInfo() {
    const theme = useTheme();
    const { openPaymentOptionForm } = usePaymentOptionForm();

    const paymentOptionList = [
        {
            name: 'PayPay',
            icon: <FaPaypal size={24} />
        },
        {
            name: 'Master',
            icon: <FaCcMastercard size={24} />
        },
        {
            name: 'VISA',
            icon: <FaCcVisa size={24} />
        },
    ]
    return (
        <>
            <Grid container 
                direction="row"
                justifyContent="center"
                alignContent="center"
            >
                <Grid item>

                    <Typography variant='h3'>
                        Default Payment Option
                    </Typography>
                    <RadioGroup defaultValue={1}>
                        <Card variant="outlined"
                            sx={{
                                padding: 2,
                                margin: [1, 1],
                                borderRadius: 2,
                                ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' }
                            }}>
                            <FormControlLabel value={0} control={<Radio sx={{
                                "&.MuiRadio-root": { color: '#fec816' }, ":hover": { bgcolor: '#fef9e8' }
                            }} />}
                                label={
                                    <Box width={470} marginTop={0.75}>
                                        <Stack direction={'row'} >
                                            <Box sx={{ marginTop: 0.6, marginRight: 0.5 }}>
                                                <LocalAtmIcon />
                                            </Box>
                                            <Typography variant='h6' component='div' gutterBottom>
                                                Cash
                                            </Typography>
                                        </Stack>
                                    </Box>
                                } />
                        </Card>

                        {paymentOptionList.map((option, index) => (
                            <Card key={index} variant="outlined"
                                sx={{
                                    padding: 2,
                                    margin: [1, 1],
                                    borderRadius: 2,
                                    ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' }
                                }}>
                                <FormControlLabel value={index + 1} control={<Radio sx={{
                                    "&.MuiRadio-root": { color: '#fec816' }, ":hover": { bgcolor: '#fef9e8' }
                                }} />}
                                    label={
                                        <Box width={470}>
                                            <Stack direction='row' justifyContent="space-between" >
                                                <Box spacing={1} display={'flex'} >
                                                    <Box sx={{ marginTop: 0.5, marginRight: 1 }}>
                                                        {option.icon}
                                                    </Box>
                                                    <Typography variant='h6' component='div' gutterBottom>
                                                        {option.name}
                                                    </Typography>
                                                </Box>

                                                <Button key={option.name} value={option.name} variant='contained' sx={{ color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }} onClick={() => { openPaymentOptionForm(name = option.name) }}><EditOutlined /></Button>
                                            </Stack>

                                            <Stack direction={'row'} alignContent={'center'} spacing={1}>
                                                <Typography variant="caption" color="text.secondary" component="div" >
                                                    **** **** **** 1159 Sky Wong
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    } />
                            </Card>
                        ))}
                    </RadioGroup>

                </Grid>
            </Grid>
        </>
    )
}
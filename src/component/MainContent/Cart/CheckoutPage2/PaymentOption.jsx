import { Box, Button, Typography, Card, Stack  } from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { FaPaypal } from 'react-icons/fa6'
import EditOutlined from '@mui/icons-material/EditOutlined';
import  {usePaymentOptionDialog}  from '../../../context/PaymentOptionDialogContext';

export default function PaymentOption() {
    const theme = useTheme();

    const {openPaymentOptionDialog} = usePaymentOptionDialog()

    return (
        <>
            <Typography marginLeft={1.5} variant="h6">Payment Option</Typography>
            <Card variant="outlined"
                sx={{
                    padding: 2,
                    margin: [1, 1],
                    borderRadius: 2,
                    ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' }
                }}>
                <Stack direction={"column"} width={'100%'}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                        <Box spacing={1} display={'flex'} >
                            <Box sx={{ marginTop: 0.5 }}>
                                <FaPaypal size={24} />
                            </Box>
                            <Typography variant='h6' component='div' gutterBottom>
                                PayPal
                            </Typography>
                        </Box>
                        <Button variant='contained' sx={{ color:"#322805", bgcolor: '#fec81a',  ":hover": { bgcolor: "#feda66" } }} onClick={openPaymentOptionDialog}><EditOutlined /></Button>
                    </Stack>
                    <Stack direction={'row'} alignContent={'center'} spacing={1}>
                        <Typography variant="caption" color="text.secondary" component="div" >
                            **** **** **** 1159 Sky Wong
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </>
    );
}
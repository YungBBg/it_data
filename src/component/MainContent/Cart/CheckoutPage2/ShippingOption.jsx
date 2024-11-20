import * as React from 'react';
import { useTheme } from '@mui/material/styles';

import { Button, Stack, Typography, Zoom, Card, Grid, Box, FormControlLabel, RadioGroup, Radio } from '@mui/material';

import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAddressForm } from '../../../context/AddressFormContext';

import CustTakeoutDrawer from '../../../custComponent/CustTakeoutDrawer';


const ShippingAddress = ({ openAddressForm }) => {
    const theme = useTheme();

    return (
        <Zoom in={true}>
            <Card variant="outlined" sx={{ padding: 1, margin: [1, 1], borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
                <Stack direction='row' justifyContent="space-between" >
                    <Typography sx={{ ml: 1, mr: 1 }} variant="h6" noWrap>Shipping Address</Typography>
                    <Button variant="contained"  sx={{ color:"#322805", bgcolor: '#fec81a',  ":hover": { bgcolor: "#feda66" }, ml: 1, mr: 1  }} onClick={openAddressForm} ><EditOutlinedIcon /></Button>
                </Stack>
                <Typography sx={{ ml: 1, mr: 1 }} variant="subtitle2">Sky</Typography>
                <Typography sx={{ ml: 1, mr: 1 }} variant="body2">IVE TM, 19 Ching Wun Road, NT</Typography>
            </Card>
        </Zoom>
    )
}


export default function ShippingOption({ handleFee, fee }) {
    const theme = useTheme();
    const { openAddressForm } = useAddressForm();

    return (
        <>
            <Typography marginLeft={1.5} variant="h6">Shipping Option</Typography>
            <Grid container>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3} >

                    <Card variant="outlined" sx={{ padding: 1, margin: [1, 1], borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
                        <CustTakeoutDrawer handleFee={handleFee} />
                    </Card>

                    {
                        (fee == 50) ?
                            <ShippingAddress fee={fee} openAddressForm={openAddressForm} />
                            : null
                    }
                </Grid>
            </Grid>
        </>
    )


}
import * as React from 'react';

import {
    Avatar,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Card,
    Divider,
    Box

} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import storeItems from "/src/component/data/breakfastItem.json"
import { useShoppingCart } from '/src/component/context/ShoppingCartContext'
import { formatCurrency } from "/src/component/utilities/formatCurrency"
import OrderSummary from '/src/component/MainContent/Cart/OrderSummary.jsx';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import { FaPaypal } from 'react-icons/fa6'

export default function CheckoutPage3() {
    const { cartItems, getItemQuantity } = useShoppingCart();

    const theme = useTheme();
    return (

        <Grid container spacing={2} justifyContent={'space-between'}>
            <Grid item xs={12} md={6}  >
                <TableContainer>
                    <Table sx={{}} aria-label="simple table">
                        <TableHead
                            sx={{
                                borderTop: '1px solid',
                                color: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : 'grey.200'
                            }}
                        >
                            <TableRow>
                                <TableCell>Food</TableCell>
                                <TableCell align="center">Total</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cartItems.map((cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id)
                                if (item == null) { return null }
                                const qty = getItemQuantity(item.id)
                                return (
                                    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align='left'>
                                            <Grid container alignItems="center" spacing={2}>
                                                <Grid item>
                                                    <Avatar
                                                        size="md"
                                                        variant="rounded"
                                                        src={item.imgUrl}
                                                    />
                                                </Grid>

                                                <Grid item>
                                                    <Stack spacing={0}>
                                                        <Stack direction="column" spacing={0}>
                                                            <Stack direction={'row'} alignItems={'center'}>
                                                                <Typography variant="caption" color='text.secondary' marginRight={0.5}>
                                                                    {qty + "x"}
                                                                </Typography>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                                                    {item.name}
                                                                </Typography>
                                                            </Stack>

                                                            <Typography variant="caption" component="span" color='text.secondary'>
                                                                {item.option}
                                                                {/* for detail */}
                                                            </Typography>

                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="subtitle1">
                                                {formatCurrency(item.price * getItemQuantity(item.id))}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12} md={5.5}>
                <Stack spacing={1}>
                    <OrderSummary fee={0} />

                    <Typography marginLeft={1.5} variant="h6">Shipping Option</Typography>
                    <Card variant="outlined" sx={{ minWidth: 400, padding: 1, borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
                        <Stack direction={"row"} paddingLeft={1.5}>
                            <DeliveryDiningOutlinedIcon />
                            Delivery $50
                        </Stack>
                        <Divider variant="middle" sx={{ margin: 1 }} />

                        <Typography marginLeft={1.5} variant="subtitle2">Sky</Typography>
                        <Typography marginLeft={1.5} variant="body2">IVE TM, 19 Ching Wun Road, NT</Typography>
                    </Card>

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
                            </Stack>
                            <Stack direction={'row'} alignContent={'center'} spacing={1}>
                                <Typography variant="caption" color="text.secondary" component="div" >
                                    **** **** **** 1159 Sky Wong
                                </Typography>
                            </Stack>
                        </Stack>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    )
}
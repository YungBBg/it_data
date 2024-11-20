import * as React from 'react';
import { useState } from 'react';
// material-ui
import {
    Avatar,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Button,
    Divider,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';

import { useTheme } from '@mui/material/styles';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import storeItems from "/src/component/data/breakfastItem.json"
import { useShoppingCart } from '/src/component/context/ShoppingCartContext'
import { formatCurrency } from "/src/component/utilities/formatCurrency"
import OrderSummary from '/src/component/MainContent/Cart/OrderSummary';

import {FoodSettingUpdate} from "/src/component/MainContent/RestaurantList/FoodSettingUpdate";
import CustSnackbar from "/src/component/custComponent/CustSnackbar"


import $, { event, nodeName } from 'jquery';

export default function CheckoutPage1() {
    const { cartItems, getItemQuantity, removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();
    // $(document).ready(() => {
    //     $("#couponMessage").hide()

    //     $("#couponBtn").click(() => {
    //         $("#coupon").val("");
    //         $("#couponMessage").show();
    //     })
    // })

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [display, setDisplay] = useState('none');
    const [couponValue, setCouponValue] = useState('');
    const [openSnack, setOpenSnack] = useState(false)

    const handleOpenUpdate = (event) => {
        event.preventDefault();
        setIsOpenUpdate(!isOpenUpdate);
    }

    const handleCouponChange =(event)=>{
        setCouponValue(event.target.value)
    }

    const checkCoupon = () =>{
        console.log(couponValue)
        if (couponValue != "OCT235K"){
            setDisplay("block")
        } else {
            setOpenSnack(true)
            setDisplay("none")
        }
    }


    const theme = useTheme();
    return (
        <>
            <Grid item xs={12}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead
                            sx={{
                                borderTop: '1px solid',
                                color: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : 'grey.200'
                            }}
                        >
                            <TableRow>
                                <TableCell>Food</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Total</TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cartItems.map((cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id)

                                if (item == null) { return null }
                                // console.log(item)
                                const qty = getItemQuantity(item.id)

                                return (
                                    <>
                                        <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align='left'>
                                                {/* <TableCell align='center' sx={{display:"flex", justifyContent:"center"}}> */}
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
                                                            {/* <Typography variant="subtitle1">{row.name}</Typography> */}
                                                            <Stack direction="column" spacing={0}>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography variant="caption" component="span" color='text.secondary'>
                                                                    {item.option}
                                                                </Typography>

                                                            </Stack>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                                {/* </TableCell> */}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack>
                                                    <Typography variant="subtitle2">
                                                        {formatCurrency(item.price)}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconButton disabled={qty == 1} onClick={qty == 1 ? () => removeFromCart(item.id) : () => decreaseCartQuantity(item.id)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    {qty}
                                                    <IconButton onClick={() => increaseCartQuantity(item.id)}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="subtitle1">
                                                    {formatCurrency(item.price * getItemQuantity(item.id))}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="center">
                                                <IconButton size="large" sx={{ color: 'orange' }} onClick={(event) => handleOpenUpdate(event)}>
                                                    <EditIcon sx={{ color: 'orange' }} />
                                                </IconButton>
                                            </TableCell>

                                            <TableCell align="center">
                                                <IconButton size="large" color='error' onClick={() => removeFromCart(item.id)}>
                                                    {/* onClick={() => removeProduct(row.itemId)} */}
                                                    <DeleteTwoToneIcon color='error' />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12}>
                <OrderSummary fee={0} />
            </Grid>

            <Grid
                container

                justifyContent="flex-end"
                mt={1}
            >
                <Stack justifyContent="flex-end">
                    <TextField
                        placeholder={'Discount Coupon'}
                        id="coupon"
                        color='warning'
                        value={couponValue}
                        onChange={handleCouponChange}
                        InputProps={{
                            endAdornment: (
                                <>
                                    <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: 1 }} />
                                    <Button id="couponBtn" sx={{ color: "#EE5508", ":hover": { bgcolor: "#feda66" } }} onClick={()=>checkCoupon()}> Apply </Button>
                                </>
                            )
                        }}
                    />
                    <Typography id="couponMessage" variant='caption' color="error" align="right" sx={{display:display}}>Invalid coupon</Typography>
                    <CustSnackbar openSnack={openSnack} setOpenSnack={setOpenSnack} message={"Thank you for using the coupon."}/>
                </Stack>
            </Grid>

            <FoodSettingUpdate isOpenUpdate={isOpenUpdate} handleOpenUpdate={handleOpenUpdate} id={1} />
        </>
    );
}

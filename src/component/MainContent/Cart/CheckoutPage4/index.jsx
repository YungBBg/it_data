import { useEffect, useState } from "react";

import { PiCookingPotBold } from 'react-icons/pi'
import { FaPaypal } from 'react-icons/fa6'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

import { Card, Typography, Grid, Table, TableContainer, TableBody, TableRow, TableCell, Avatar, Tabs, Tab, Box, Stack, Divider, useTheme, useMediaQuery, Rating, Paper, TextField, FormControl, Button } from "@mui/material";

import storeItems from "/src/component/data/breakfastItem.json"
import { useShoppingCart } from '/src/component/context/ShoppingCartContext'
import { formatCurrency } from "/src/component/utilities/formatCurrency"
import CustSnackbar from "/src/component/custComponent/CustSnackbar";


export default function CheckoutPage4() {
    const { cartItems, getItemQuantity } = useShoppingCart();

    const [orderState, setorderState] = useState(0);

    const [deliveryColor, setDeliveryColor] = useState("")
    const [enjoyColor, setEnjoyColor] = useState("")

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    const [orderRating, setOrderRating] = useState(0)
    const [readOnly, setReadOnly] = useState(false)
    const [openSnack, setOpenSnack] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setorderState((prevorderState) => {
                if (prevorderState === 2) {
                    return 2;
                }
                return prevorderState + 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (orderState === 1) {
            setDeliveryColor("rgb(255, 152, 0)")
        }
        if (orderState === 2) {
            setEnjoyColor("rgb(255, 152, 0)")
        }
    }, [orderState])

    let subTotalPrice = cartItems.reduce((prevPrice, cartItem) => {
        const item = storeItems.find(i => i.id === cartItem.id);
        const qty = getItemQuantity(item.id);
        return prevPrice + item.price * qty;
    }, 0);

    let totalPrice = subTotalPrice + 50;

    return (
        <>
            <Stack
                direction="column"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Stack
                        direction="column"
                        alignItems="center"
                    >
                        <Tabs
                            value={orderState}
                            aria-label="icon label tabs example"
                            sx={{
                                "& .MuiTabs-indicator": { backgroundColor: "#ff9800" },
                            }}>
                            
                            <Tab
                                icon={<PiCookingPotBold size={24} />}
                                label="Cooking"
                                disableRipple
                                sx={{
                                    marginLeft: isXs ? 0 : (isSm ? 5 : (isMd ? 10 : 0)),
                                    marginRight: isXs ? 0 : (isSm ? 5 : (isMd ? 10 : 0)),
                                    cursor: "default",
                                    "&.Mui-selected": {
                                        color: "rgb(255, 152, 0)",
                                    },
                                    color: "rgb(255, 152, 0)",
                                }}
                            />
                            <Tab
                                icon={<DeliveryDiningIcon />}
                                label="Delivery"
                                disableRipple
                                sx={{
                                    marginLeft: isXs ? 0 : (isSm ? 5 : (isMd ? 10 : 0)),
                                    marginRight: isXs ? 0 : (isSm ? 5 : (isMd ? 10 : 0)),
                                    cursor: "default",
                                    "&.Mui-selected": {
                                        color: "rgb(255, 152, 0)",
                                    },
                                    color: deliveryColor,
                                }}
                            />
                            <Tab
                                icon={<DinnerDiningIcon />}
                                label="Enjoy"
                                disableRipple
                                sx={{
                                    marginLeft: isXs ? 0 : (isSm ? 5 : (isMd ? 10 : 0)),
                                    marginRight: isXs ? 0 : (isSm ? 5 : (isMd ? 10 : 0)),
                                    cursor: "default",
                                    "&.Mui-selected": {
                                        color: "rgb(255, 152, 0)",
                                    },
                                    color: enjoyColor,
                                }}
                            />
                        </Tabs>

                        <TableContainer component={Paper} sx={{ maxWidth: 300, boxShadow: "none" }}>
                            <Table size="small"  >
                                <TableBody >
                                    <TableRow>
                                        <TableCell sx={{ border: 0, fontSize: 15, fontWeight: 'bold', }}>Order Time:</TableCell>
                                        <TableCell align="right" sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>12:30</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>Estimated Time:</TableCell>
                                        <TableCell align="right" sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>13:30</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>Order Number:</TableCell>
                                        <TableCell align="right" sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>1580</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>Customer:</TableCell>
                                        <TableCell align="right" sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>Sky Wong</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>Tel:</TableCell>
                                        <TableCell align="right" sx={{ border: 0, fontSize: 15, fontWeight: 'bold' }}>67832591</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <FormControl fullWidth sx={{ m: 1 }}>
                            {orderState == 2 ?
                                <>
                                    <Stack direction={'row'} spacing={1} >
                                        <Typography component="legend" variant="subtitle2" color="text.secondary" paddingTop={0.3}>Tap to Rate</Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={orderRating}
                                            readOnly={readOnly}
                                            precision={0.5}
                                            onChange={(event, newValue) => {
                                                setOrderRating(newValue);
                                            }}
                                        />
                                    </Stack>

                                    <Stack mt={2}>
                                        <TextField
                                            label="Comment"
                                            placeholder="Please provide feeback to help improve the quality of our Restaurants."
                                            multiline
                                            rows={3}
                                            color="warning"
                                            InputProps={{
                                                readOnly: readOnly,
                                              }}
                                        />
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        justifyContent="flex-end"
                                    >
                                        {!readOnly?
                                        <Button variant="contained" 
                                        sx={{ my: 1, ml: 1, color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }}
                                            onClick={() => {
                                                setReadOnly(true);
                                                setOpenSnack(true);
                                            }}
                                        >
                                            Submit
                                        </Button>
                                        :
                                        null}
                                    </Stack>
                                </>
                                : null
                            }
                            <CustSnackbar openSnack={openSnack} setOpenSnack={setOpenSnack} />
                            <></>
                        </FormControl>
                    </Stack>

                    <>
                        <Typography margin={1.5} variant="h5">Order Deatil</Typography>
                        <Card variant="outlined" sx={{ padding: 3, borderRadius: 2 }}>
                            <Typography ml={1.5} variant="h6">Shipping Address</Typography>
                            <Typography ml={1.5} variant="body2">IVE TM, 19 Ching Wun Road, NT</Typography>
                            <Divider variant="middle" sx={{ margin:1, bgcolor:"black" }} />
                            <Typography marginLeft={1.5} marginBottom={-1.5} variant="h6">Detail</Typography>
                            <TableContainer>
                                <Table sx={{ marginBottom: 1 }} aria-label="simple table">
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
                                        <TableRow>
                                            <TableCell sx={{borderBottom:'1px solid black'}}>
                                                <Typography variant="h6">
                                                    {"Total Price"}
                                                </Typography>
                                            </TableCell >
                                            <TableCell align="center" sx={{borderBottom:'1px solid black'}}>
                                                <Typography variant="subtitle1">
                                                    {formatCurrency(totalPrice)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Stack direction={"column"} width={'100%'} marginLeft={1.5}>
                                <Typography variant="h6">Payment Option</Typography>
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
                    </>
                </Grid>
            </Stack>
        </>
    );
}

import { Avatar, Button, Card, Stack, Typography, Grid, Box } from '@mui/material'
import orderRecords from '../data/favoriteItems.json'
import { useState } from 'react'
import { useTheme } from '@mui/material'

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import CustSnackbar from '../custComponent/CustSnackbar'

import { useShoppingCart } from '../context/ShoppingCartContext';

function FavIconButton() {
    const [favIcon, setFavIcon] = useState(true)
    const [openSnack, setOpenSnack] = useState(false);

    return (
        <>
            <IconButton color='error' onClick={() => { setFavIcon(!favIcon); setOpenSnack(true); }}>
                {favIcon ?
                    <FavoriteIcon /> :
                    <HeartBrokenIcon />
                }
            </IconButton>

            <CustSnackbar openSnack={openSnack} setOpenSnack={setOpenSnack} message={favIcon ? "Already add to Favorite" : "Feel free to like it again"} />
        </>

    )
}

export default function FavoriteItem() {

    const { increaseCartQuantity } = useShoppingCart();

    const handleSubmit = ({ foodID }) => {
        console.log(foodID);
        increaseCartQuantity(foodID);
    };

    const theme = useTheme();
    return (
        <>
            {orderRecords.map((orderRecord, index) => {
                return (
                    <Grid item key={index} xs={12} >
                        <Card key={index} variant="outlined" sx={{ padding: 3, borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
                            <Stack spacing={1} direction="row" display={'flex'} justifyContent={'space-between'} >
                                <Stack >
                                    <Stack direction={'row'} spacing={1}>

                                        <Avatar variant="rounded" src={orderRecord.img} sx={{ width: 56, height: 56 }} />
                                        <Stack spacing={1}>
                                            <Stack spacing={3} direction={'row'} >
                                                <Typography variant='subtitel2' noWrap> {orderRecord.setMenu} </Typography>
                                                <Typography variant='subtitel2'> ${orderRecord.price} </Typography>
                                            </Stack>
                                            <Typography variant='body2' color='text.secondary'> {orderRecord.menuDetail} </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack  >
                                    <FavIconButton />
                                </Stack>
                            </Stack>

                            <Box mt={1}>
                                <Button onClick={() => handleSubmit({foodID:orderRecord.foodID})} fullWidth variant='contained' sx={{ bgcolor: 'orange', ":hover": { bgcolor: 'orange' } }}>Order</Button>
                            </Box>
                        </Card>
                    </Grid>
                )
            })}
        </>
    )
}
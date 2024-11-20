import { Avatar, Button, Card, Divider, Stack, Typography, Rating, Snackbar, Alert, Grid, Box } from '@mui/material'
import orderRecords from '../data/orderRecords.json'
import { useState } from 'react'
import { useTheme } from '@mui/material'
import CustSnackbar from '../custComponent/CustSnackbar';

const FoodRating = ({ setOpenSnack, rating }) => {

    const [orderRating, setOrderRating] = useState(0)
    const [RatingRead, setRatingRead] = useState(false)
    return (
        < Rating
            name="simple-controlled"
            value={orderRating || rating}
            readOnly={rating > 0 || RatingRead}
            precision={0.5}
            onChange={(event, newValue) => {
                setOrderRating(newValue);
                setRatingRead(true);
                setOpenSnack(true);
            }}
        />
    )
}

export default function FavoriteItem() {
    const [openSnack, setOpenSnack] = useState(false);

    const theme = useTheme();
    return (
        <>
            {orderRecords.map((orderRecord, index) => {
                return (
                    <>
                        <Grid item key={index} xs={12} >
                            <Card key={index} variant="outlined" sx={{ padding: 3, borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
                            <Typography variant='body2' color='text.secondary'> {orderRecord.orderDate} </Typography>

                                <Grid container >
                                    <Grid item display={'flex'} xs={12} >

                                        <Grid item >
                                            <Avatar variant="rounded" src={orderRecord.img} sx={{mr:1}} />
                                        </Grid>

                                        <Grid item xs={12} display={'flex'} flexDirection={'column'}>

                                            <Box display={'flex'} justifyContent={'space-between'}>
                                                <Typography variant='subtitel2'> {orderRecord.restaurant} </Typography>
                                                <Typography variant='subtitel2'> ${orderRecord.price} </Typography>
                                            </Box>

                                            <Typography variant='body2' color='text.secondary'> {orderRecord.menuDetail} </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Button href='/Checkout' fullWidth variant='contained' sx={{ bgcolor: 'orange', ":hover": { bgcolor: 'orange' } }}>Reorder</Button>
								<p></p>
								<Button href='/Complain' fullWidth variant='contained' sx={{ bgcolor: 'black', ":hover": { bgcolor: 'red' } }}>Complain</Button>

                                <Divider variant="middle" sx={{ margin: 1 }} />

                                <Box display={'flex'} justifyContent={'center'}>
                                    <FoodRating key={index} setOpenSnack={setOpenSnack} rating={orderRecord.rating} />
                                </Box>
                            </Card>
							
                        </Grid>
                    </>
                )

            })}

            <CustSnackbar openSnack={openSnack} setOpenSnack={setOpenSnack} />
        </>
    )
}

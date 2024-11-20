import { Box, Grid, Stack, Typography } from "@mui/material";
import OrderRecode from './OrderRecordItem'


export default function FavoriteList() {

    return (
        <>
            <Typography variant='h5'> Orders Records </Typography>
            <Box display="flex" justifyContent="center">
                <Grid container spacing={1} xs={12} md={6} lg={5} xl={4} >
                    <OrderRecode />
                </Grid>
            </Box>
        </>
    )
}
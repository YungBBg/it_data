import { Box, Grid, Typography } from "@mui/material";
import FavoriteItem from './FavoriteItem'

export default function FavoriteList() {

    return (
        <>
            <Typography variant='h6'> Favorite </Typography>

            <Box sx={{ display: "flex", justifyContent: 'center' }} >
                <Grid container xs={12} md={6} lg={5} xl={4}  spacing={1} >
                    <FavoriteItem />
                </Grid>
            </Box>
        </>
    )
}
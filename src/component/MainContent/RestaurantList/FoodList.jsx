import * as React from 'react';
import { IconButton, Stack, Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

// import Grid from "@mui/material/Grid";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { useFoodSetting } from '../../context/FoodSettingContext';
import { useShoppingCart } from "../../context/ShoppingCartContext"
import restaurantList from '../../data/restaurantList.json';

import { useLocation } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';

import CustTakeoutDrawer from '../../custComponent/CustTakeoutDrawer';

import { useNavigate } from 'react-router-dom';

export default function FoodList() {
  const { openFoodSetting } = useFoodSetting()
  const { getItemQuantity } = useShoppingCart()
  const quantity = getItemQuantity()

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const restType = state.restType;
  const restName = state.restName;

  const currRestList = restaurantList.find((rest) => (rest.type === restType));
  const currRest = currRestList.children.find((rest) => (rest.name === restName));

  return (
    <>
      <IconButton id='backBtn' sx={{ ":hover": { bgcolor: "rgba(0, 0, 0, 0.1)" } }} onClick={() => { console.log('foodlist'); navigate(-1) }}>
        <ReplyIcon />
      </IconButton>

      <Stack m={2} ml={1} spacing={1}>
        <Typography variant='h4' sx={{ display: "flex", alignItems: 'center' }}>
          <Avatar variant={'rounded'} src={currRest.img} sx={{ width: 50, height: 50, mr: 1 }} />
          {currRest.name}
        </Typography>

        <Typography sx={{ display: "flex", alignItems: 'center', color: "text.secondary" }}>
          <StorefrontIcon />
          {currRest.address}
        </Typography>

        <Typography sx={{ display: "flex", alignItems: 'center', color: "text.secondary" }}>
          <StarIcon sx={{ color: 'orange' }} />
          {currRest.rating}/5
        </Typography>

        <Stack width={260}>
          <CustTakeoutDrawer />
        </Stack>
      </Stack>

      <Box display="flex" justifyContent="center">
        <Grid2 container spacing={2} >
          {currRest.menu.map((item, index) => (
            <Grid2 key={index} {...{ xs: 12, md: 6 }}>
              <CardActionArea onClick={() => { openFoodSetting(item.id) }}>
                <Card sx={{ display: 'flex' }}>

                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flexGrow: '1' }}>
                      <Typography component="div" variant="h5">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        ${item.price}
                      </Typography>
                    </CardContent>
                  </Box>

                  <Box sx={{ flexGrow: 1 }} />

                  <Grid2 display="flex" justifyContent="flex-end">
                    <CardMedia
                      component="img"
                      sx={{ minWidth: 150, width: 151, height: 150 }}
                      image={item.imgUrl}
                    />
                  </Grid2>
                </Card>
              </CardActionArea>
            </Grid2>
          ))}
        </Grid2>
      </Box >
    </>
  )
}
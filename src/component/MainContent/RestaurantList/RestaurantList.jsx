import * as React from 'react';
import { Box, Grid, MobileStepper, IconButton, TextField, Autocomplete, Card, CardContent, CardMedia, CardActionArea, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom'
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import restaurantList from '../../data/restaurantList.json'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    label: 'couopn1',
    imgPath: '/src/assets/img/coupon/coupon1.png',
  },
  {
    label: 'couopn2',
    imgPath: '/src/assets/img/coupon/coupon2.png'
  },
  {
    label: 'couopn3',
    imgPath: '/src/assets/img/coupon/coupon3.png'
  },
  {
    label: 'couopn4',
    imgPath: '/src/assets/img/coupon/coupon4.png'
  },
  {
    label: 'couopn5',
    imgPath: '/src/assets/img/coupon/coupon5.png'
  },
];

export default function RestaurantList() {

  const [keyWord, setKeyWord] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = images.length;

  const handleKeyWord = (word) => {
    setKeyWord(word)
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep == maxSteps - 1 ? 0 : (prevActiveStep + 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep == 0 ? maxSteps - 1 : (prevActiveStep - 1));
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} sx={{ minWidth: 522, maxWidth: 1044, flexGrow: 1 }}>
          <IconButton
            size="large"
            bgcolor="success"
            sx={{ bgcolor: '#fecd30', opacity: 0.8, ":hover": { bgcolor: '#fee38c' } }}
            onClick={handleBack}
          >
            <KeyboardArrowLeft />
          </IconButton>

          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 255,
                      display: 'block',
                      // maxWidth: 400,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>

          <IconButton
            size="large"
            bgcolor="success"
            sx={{ bgcolor: '#fecd30', opacity: 0.8, ":hover": { bgcolor: '#fee38c' } }}
            onClick={handleNext}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Stack>

        <Box>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
          />
        </Box>
      </Stack>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        size='small'
        options={restaurantList.map((option) => option.type)}
        sx={{ margin: 1 }}
        renderInput={(params) =>
          <TextField
            color="warning"
            {...params}
            placeholder="Restaurant..."
            sx={{ bgcolor: 'White', borderRadius: 1 }}
          />}
        onChange={(event, value) => { handleKeyWord(value) }}
      />
      {restaurantList.map((restaurant, index) => (
        (restaurant.type == keyWord || keyWord == null) ?
          <>
            <Stack key={index} direction={'row'} justifyContent={'space-between'} alignItems={'center'} pl={1.5} pr={1.5}>
              <Typography gutterBottom variant="h5" component="div">{restaurant.type}</Typography>
              <Link to={'/MoreRestaurantList'} state={{ restType: restaurant.type }}>More</Link>
            </Stack>

            <Box sx={{ flexGrow: 1, p: 2 }}>
              <Grid container spacing={1}>
                {restaurant.children.map((rest, index) => (
                  <>
                    <Grid item key={index} {...{ xs: 12, sm: 6, lg: 3 }}>
                      <Card>
                        <CardActionArea>
                          <Link to={rest.path} state={{ restType: restaurant.type, restName: rest.name }} style={{ color: 'blue', textDecoration: 'none' }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={rest.img}
                              alt={rest.name}
                            />
                            <CardContent>
                              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography gutterBottom variant="h6" noWrap component="div">
                                  {rest.name}
                                </Typography>

                                <Stack direction={'row'} >
                                  <StarIcon sx={{ color: "orange" }} />
                                  <Typography gutterBottom variant='subtitle2' color={'text.secondary'} mt={0.3}>
                                    {rest.rating}/5
                                  </Typography>
                                </Stack>
                              </Stack>

                              <Typography variant="body2" color="text.secondary">
                                {rest.type}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {Array(rest.price).fill('$')}
                              </Typography>
                            </CardContent>
                          </Link>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          </>
          :
          null
      ))}
    </>

  )
}


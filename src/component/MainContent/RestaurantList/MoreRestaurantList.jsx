import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Grid, IconButton } from '@mui/material';
import restaurantList from '../../data/restaurantList.json'
import StarIcon from '@mui/icons-material/Star';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TbSortAscendingNumbers, TbSortDescendingNumbers } from 'react-icons/tb'
import TuneIcon from '@mui/icons-material/Tune';
import ReplyIcon from '@mui/icons-material/Reply';

export default function RestaurantList() {

  const [sort, setSort] = React.useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;
  const restType = state.restType;

  let currRest = restaurantList.find((restaurant) => restaurant.type == restType)
  const handleChange = (event) => {
    setSort(event.target.value);
    if (event.target.value == "lTh") {
      currRest = currRest.children.sort((prev, post) => prev.price - post.price);
    } else if (event.target.value == 'hTl') {
      currRest = currRest.children.sort((prev, post) => post.price - prev.price);
    } else if (event.target.value == "rating") {
      currRest = currRest.children.sort((prev, post) => post.rating - prev.rating);
    }
  };

  return (
    <>
      <IconButton id='backBtn' sx={{ ":hover": { bgcolor: "rgba(0, 0, 0, 0.1)" } }} onClick={() => { console.log('more'); navigate(-1) }}>
        <ReplyIcon />
      </IconButton>

      <Stack direction={'row'} alignItems={'center'} spacing={1} pl={2}>

        <Typography gutterBottom variant="h4" component="div" >{currRest.type}</Typography>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
          {!sort ?
            <InputLabel id="demo-select-small-label" shrink={false}>
              <Stack direction={'row'} alignContent={'center'} spacing={1}>

                <TuneIcon />
                <Typography gutterBottom variant="body" >Filter</Typography>

              </Stack>
            </InputLabel>
            : null}
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            // label="Filter"
            value={sort}
            onChange={handleChange}
          >
            <MenuItem value={"lTh"}>
              <Stack direction={'row'} alignContent={'center'} spacing={1}>
                <TbSortAscendingNumbers size={24} />
                <Typography gutterBottom variant="body" >Price</Typography>
              </Stack>
            </MenuItem>

            <MenuItem value={"hTl"}>
              <Stack direction={'row'} alignContent={'center'} spacing={1}>
                <TbSortDescendingNumbers size={24} />
                <Typography gutterBottom variant="body" >Price</Typography>
              </Stack>
            </MenuItem>

            <MenuItem value={"rating"}>
              <Stack direction={'row'} alignContent={'center'} spacing={1}>
                <StarIcon sx={{ color: "orange" }} />
                <Typography gutterBottom variant="body">Rating (From Highest to Lowest)</Typography>
              </Stack>
            </MenuItem>

          </Select>
        </FormControl >
      </Stack>

      <Box sx={{ flexGrow: 1, p: 2 }}>


        <Grid container spacing={1}>

          {currRest.children.map((rest, index) => (
            <>
              <Grid item key={rest.name} {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>

                <Card  >
                  <CardActionArea>

                    <Link to={rest.path} state={{ restType: currRest.type, restName: rest.name }} style={{ color: 'blue', textDecoration: 'none' }}>
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
  )
}


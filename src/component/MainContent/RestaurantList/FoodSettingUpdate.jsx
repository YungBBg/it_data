import * as React from 'react';
import { useRef } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// import { useShoppingCart } from '../../context/ShoppingCartContext';
// import { useFoodSetting } from '../../context/FoodSettingContext';

import storeItems from "../../data/breakfastItem.json"

export function FoodSettingUpdate({ isOpenUpdate, handleOpenUpdate, id }) {
  // const { increaseCartQuantity } = useShoppingCart();
  // const { closeFoodSetting } = useFoodSetting();
  const [favorite, setFavorite] = React.useState(false)
  const [error, setError] = React.useState(false);
  // const [radioGroups, setRadioGroups] = React.useState({});
  const descriptionElementRef = useRef(null);

  const [qty, setQty] = React.useState(1);

  const handleToggleFavorite = () => {
    setFavorite(!favorite)
  }

  const handleRadioChange = (event, title) => {
    setError(false)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleOpenUpdate(event);
  };

  const item = storeItems.find(i => i.id === id)

  return (
    <Dialog
      open={isOpenUpdate}
      onClose={handleOpenUpdate}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      {/* Title */}
      <DialogTitle id="scroll-dialog-title" sx={{ padding: 0 }} >
        <ImageListItem>
          <Box display={'flex'} justifyContent={'center'}>
            <img
              height="250"
              src={item.imgUrl}
              loading="lazy"
            />
          </Box>

          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            position="top"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                onClick={handleToggleFavorite}
              >
                {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}

              </IconButton>
            }
            actionPosition="right"
          />
        </ImageListItem>

        <Typography gutterBottom variant="h5" component="div" paddingLeft={2} paddingRight={2}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box >
              {item.name}
            </Box>
            <Box >
              ${item.price}
            </Box>
          </Box>
        </Typography>

        <Typography variant="body2" color="text.secondary" paddingLeft={2} paddingRight={2}>
          {item.name}
        </Typography>
      </DialogTitle>

      <DialogContent dividers={scroll === 'paper'} >
        <Divider variant="middle" sx={{ margin: 1 }} />

        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          display={"flex"}
          flexDirection={"column"}
        >
          {itemList.map((item, listIndex) => (
            <FormControl className={"formControl-" + item.title} error={error} variant="standard" key={listIndex}>
              <FormLabel  required color='warning'>{item.title}</FormLabel>
              <RadioGroup
                required
                defaultValue={item.children[0].foodName}
                onChange={() => { handleRadioChange(event, item.title) }}
              >
                {item.children.map((children, index) => (
                  <FormControlLabel
                    key={index}
                    value={children.foodName}
                    control={<Radio name={item.title} sx={{"&.MuiRadio-root": { color: '#fec816' }, ":hover": { bgcolor: '#fef9e8' } }}/>}
                    label={
                      <Box display={'flex'} justifyContent={'space-between'} width={400}>
                        <Box>{children.foodName}</Box>
                        <Box>{children.price}</Box>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ))}
        </DialogContentText>

        <Divider variant="middle" sx={{ marginTop: 1 }} />

        <DialogActions>
            <Stack direction="row" sx={{ pr:5, alignItems: 'center' }} spacing={1}>
              <IconButton disabled={qty == 1} onClick={() => setQty(qty - 1)}>
                <RemoveIcon />
              </IconButton>
              <Typography>
                {qty}
              </Typography>
              <IconButton onClick={() => setQty(qty + 1)} >
                <AddIcon />
              </IconButton>
            </Stack>
            <Button variant="contained" sx={{ color:'#322805', bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }} onClick={(event) => {handleSubmit(event)}}>Update</Button>
        </DialogActions>

      </DialogContent>
    </Dialog>
  )
}

const itemList = [
  {
    "title": "main",

    "children": [
      {
        "foodName": "food1",
        "price": "free"
      },
      {
        "foodName": "food2",
        "price": "$1"
      },
    ]
  },
  {
    "title": "drink",
    "children": [
      {
        "foodName": "water",
        "price": "free"
      },
      {
        "foodName": "cola",
        "price": "$3"
      },
    ]
  }
]
import { useShoppingCart } from "../context/ShoppingCartContext"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import storeItems from "../data/breakfastItem.json"
import { formatCurrency } from "../utilities/formatCurrency"
import { Link } from '@mui/material';
import { useState } from "react";

//update modify menu function
import { FoodSettingUpdate } from "../MainContent/RestaurantList/FoodSettingUpdate";

export default function CartItem({ id }) {
  const { removeFromCart, increaseCartQuantity, getItemQuantity, decreaseCartQuantity } = useShoppingCart()
  const item = storeItems.find(i => i.id === id)
  if (item == null) { return null }
  const qty = getItemQuantity(id)

  //update modify menu function
  const [ isOpenUpdate, setIsOpenUpdate ] = useState(false);

  const handleOpenUpdate = (event) => {
    event.preventDefault();
    setIsOpenUpdate(!isOpenUpdate);
  }

  return (
    <>
      <Card sx={{ display: 'flex', margin: 1, boxShadow: 0, borderRadius: 0 }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={item.imgUrl}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Box display={"flex"} justifyContent={"space-between"} width={200}>
              <Stack direction={'column'}>
                <Link href="#" underline="hover" color="orange" onClick={(event) => handleOpenUpdate(event)}>
                  <Typography >
                    {item.name}
                  </Typography>
                </Link>

                <Typography variant="caption" color='text.secondary'>
                  {item.option}
                </Typography>
              </Stack>
              <Typography >
                {formatCurrency(item.price * getItemQuantity(id))}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", pl: 1, pb: 1 }}>

            <Box>
              <IconButton disabled={qty == 1} onClick={() => decreaseCartQuantity(item.id)}>
                <RemoveIcon />
              </IconButton>
              {qty}
              <IconButton onClick={() => increaseCartQuantity(item.id)}>
                <AddIcon />
              </IconButton>
            </Box>

            <IconButton onClick={() => removeFromCart(item.id)} >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>

      <FoodSettingUpdate isOpenUpdate={isOpenUpdate} handleOpenUpdate={handleOpenUpdate} id={id}/>
    </>
  )
}
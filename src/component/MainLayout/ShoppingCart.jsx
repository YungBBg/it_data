import { useShoppingCart } from "../context/ShoppingCartContext"
import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import CartItem from "./CartItem";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const drawerWidth = 400;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  // borderRight: 'none',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  // borderRight: 'none',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'true' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems } = useShoppingCart()

  return (
    <>
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={closeCart}
      >
        <DrawerHeader />

        {cartItems.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Box display={"flex"} justifyContent={"center"} margin={1}>
            <Button href="/Checkout" variant="contained" size="large" startIcon={<ShoppingCartOutlinedIcon />} sx={{ width: 400, color:'black', bgcolor:'#fec816', ":hover":{bgcolor:'#feda66'}}} >checkout</Button>
          </Box>
        </>
      </Drawer>

    </>
  )
}
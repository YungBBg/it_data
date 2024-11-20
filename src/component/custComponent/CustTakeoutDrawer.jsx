import * as React from 'react';

import { Stack, Button, Typography, Box, SwipeableDrawer, Tabs, Tab, MenuItem } from '@mui/material';

import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';


const drawerBleeding = 56;
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  // backgroundColor:
  //   theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const TakeOutDrawer = ({ openDrawer, toggleDrawer, option, handleOption, handleTakeoutTime }) => {
  return (
    <Root>
      <CssBaseline />
      {/* <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      /> */}

      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => { toggleDrawer() }}
        onOpen={() => { toggleDrawer() }}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { borderRadius: '8px' },
        }}
      >

        <Stack spacing={2}>
          <Puller />
          <Tabs value={option} variant={'fullWidth'} onChange={handleOption} sx={{ direction: 'row', justifyItems: "center", "& .MuiTabs-indicator": { bgcolor: "#ffa618" } }}>
            <Tab
              icon={<DeliveryDiningOutlinedIcon />}
              label="Delivery"
              sx={{
                "&.Mui-selected": {
                  color: "#ffa618"
                },
              }} />
            <Tab
              icon={<ShoppingBagOutlinedIcon />}
              label="Pick-Up"
              sx={{
                "&.Mui-selected": {
                  color: "#ffa618"
                },
              }}
            />
          </Tabs>
          <Stack sx={{ overflow: 'auto', maxHeight: (300) }}>

            {
              Array.from({ length: 24 }, (_, i) => {
                let hour1 = `${(i.toString().length <= 1) ? "0" + i : i}:00-${(i.toString().length <= 1) ? "0" + i : i}:30`;
                let hour2 = `${(i.toString().length <= 1) ? "0" + i : i}:30-${(i == 9) ? i + 1 : (i.toString().length <= 1) ? "0" + (i + 1) : i + 1}:00`;
                return (
                  <>
                    <MenuItem key={i} value={hour1} sx={{ justifyContent: 'center', borderRadius: 8, ":hover": { bgcolor: '#fcd882' } }} onClick={() => { handleTakeoutTime(hour1) }}>
                      {hour1}
                    </MenuItem >

                    <MenuItem key={i + 0.5} value={hour2} sx={{ justifyContent: 'center', borderRadius: 8, ":hover": { bgcolor: '#fcd882' } }} onClick={() => { handleTakeoutTime(hour2) }}>
                      {hour2}
                    </MenuItem >
                  </>)
              })
            }
          </Stack>
        </Stack>
      </SwipeableDrawer>
    </Root>
  );
}

export default function TakeoutOptions({ handleFee = null }) {
  const [option, setOption] = React.useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [takeoutTime, setTakeoutTime] = React.useState('00:00-00:30')

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }
  const handleOption = (event, newValue) => {
    setOption(newValue)
    if (handleFee) {

      if (newValue == 0) {
        handleFee(50)
      } else {
        handleFee(0)
      }
    }

  }

  const handleTakeoutTime = (value) => {
    console.log(value)
    setTakeoutTime(value)
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <Stack direction={'row'} alignItems={"center"} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={"center"} spacing={1}>

          {option == 0 ?
            <DeliveryDiningOutlinedIcon />
            :
            <ShoppingBagOutlinedIcon />
          }

          <Typography>{option == 0 ? "Delivery" : "Pick-up"}</Typography>
          <Typography>{takeoutTime}</Typography>
        </Stack>
        <Stack>
          <Button variant="contained" sx={{color: "#322805",  bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }} onClick={toggleDrawer}>
            <EditOutlinedIcon />
          </Button>
        </Stack>
      </Stack>

      <TakeOutDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} option={option} handleOption={handleOption} takeoutTime={takeoutTime} handleTakeoutTime={handleTakeoutTime} />
    </>
  )
}
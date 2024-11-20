// material-ui
import { useAddressForm } from '/src/component/context/AddressFormContext';
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import AddressCard from './AddressCard';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Stack, TextField } from '@mui/material';

const NewAddressForm = () => {
    const theme = useTheme();
    const [region, setRegion] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const { createAddressCard } = useAddressForm();

    function handleChange(event) {
        setDistrict(event.target.value);
        setRegion(() => {

            if (event.target.value <= 4) {
                return "Hong Kong"
            } else if (event.target.value <= 9) {
                return "Kowloon"
            } else {
                return "New Territories"
            }
        });
    };

    const custTheme = createTheme({
        palette: {
            text: {
                disabled: 'rgba(0, 0, 0, 0.6)',
            },
        },
    });


    return (
        <Card variant="outlined" sx={{ padding: 1.5, margin: [1, 1], borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
            <Stack direction={'column'} spacing={1}>
                <TextField
                    color='warning'
                    required
                    id="outlined-required"
                    label="Address1"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderColor: '#fec816', // Set your desired border color here
                        },
                        '& .MuiOutlinedInput-root:hover': {
                            borderColor: '#fec816', // Set your desired hover border color here
                        },
                    }}
                />

                <TextField
                    color='warning'
                    id="outlined-required"
                    label="Address2"
                />

                <Stack direction={'row'} spacing={2} >

                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" color='warning'>District</InputLabel>
                        <Select
                            color='warning'

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="District"
                            value={district}
                            onChange={handleChange}

                        >
                            {/* hong kong */}
                            <MenuItem value={1}>Central and Western</MenuItem>
                            <MenuItem value={2}>Eastern</MenuItem>
                            <MenuItem value={3}>Southern</MenuItem>
                            <MenuItem value={4}>Wan Chai</MenuItem>
                            {/* kowloon */}
                            <MenuItem value={5}>Kowloon City</MenuItem>
                            <MenuItem value={6}>Kwun Tong</MenuItem>
                            <MenuItem value={7}>Sham Shui Po</MenuItem>
                            <MenuItem value={8}>Wong Tai Sin</MenuItem>
                            <MenuItem value={9}>Yau Tsim Mong</MenuItem>
                            {/* new territories */}
                            <MenuItem value={10}>Islands</MenuItem>
                            <MenuItem value={11}>Kwai Tsing</MenuItem>
                            <MenuItem value={12}>North</MenuItem>
                            <MenuItem value={13}>Sai Kung</MenuItem>
                            <MenuItem value={14}>Sha Tin</MenuItem>
                            <MenuItem value={15}>Tai Po</MenuItem>
                            <MenuItem value={16}>Tsuen Wan</MenuItem>
                            <MenuItem value={17}>Tuen Mun</MenuItem>
                            <MenuItem value={18}>Yuen Long</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>

                        <ThemeProvider theme={custTheme}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Region"
                                value={region}
                                className="disabled-textfield"

                            />
                        </ThemeProvider>
                    </FormControl>
                </Stack>
                <Stack direction='row' justifyContent="flex-end">
                    <Button variant="contained" onClick={createAddressCard} sx={{ color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }}>New Address</Button>
                </Stack>
            </Stack>
        </Card >
    )
}

export default function AddressForm({ isOpen, isOpenCard, cardQty }) {

    const { closeAddressForm, openAddressCard } = useAddressForm();
    const theme = useTheme();

    return (
        <Dialog
            open={isOpen}
            onClose={closeAddressForm}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
        >
            {/* Title */}
            <DialogTitle id="scroll-dialog-title" >
                Shipping Address
            </DialogTitle>

            <DialogContent dividers={scroll === 'paper'} >

                <Stack direction="column" spacing={2}>
                    {Array.from(Array(cardQty), (_, i) => (
                        <AddressCard key={i} id={i + 1} />
                    ))}

                    <Divider variant="middle" sx={{ margin: 3 }} />

                    {(!isOpenCard) ?
                        <Button onClick={(!isOpenCard) ? openAddressCard : null} variant="outlined" sx={{ color: "#fec816", border: '1px solid #EF9D00', ":hover": { border: '1px solid #ef9d00', bgcolor: '#FEF9E8' }, padding: 1.5, margin: [1, 1], borderRadius: 2, }}>
                            <AddIcon />
                        </Button>
                        : null}
                    {(isOpenCard) ? <NewAddressForm /> : null}
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

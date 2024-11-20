import { useState, useEffect } from 'react';
// material-ui
import {
    Avatar,
    Grid,
    IconButton,
    Stack,
    Typography,
    Button,
    TextField,
    Card,
    Link,
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
function ImageUpload() {
    const [selectedImage, setSelectedImage] = useState(<AddPhotoAlternateIcon />);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    return (
        <>
            <IconButton component="label" variant="contained" disableRipple={true}>
                <Avatar
                    alt="menuIcon"
                    variant="rounded"
                    src={selectedImage}
                    sx={{ width: 56, height: 56, borderRadius: "1" }}
                >
                    {selectedImage}
                </Avatar>
                <input type="file" hidden onChange={handleImageChange} />
            </IconButton >
        </>
    );
}
const Food = ({ isfirstFood, removeFoods }) => {
    const [opts, setOpts] = useState([]);
    const addOpt = () => {
        setOpts([...opts, {}]);
    }
    const removeOpt = () => {
        const newOpts = [...opts];
        newOpts.pop();
        setOpts(newOpts);
    }
    return (
        <>
            <Card direction={'col'} sx={{ padding: 1, bgcolor: 'aliceblue' }} spacing={1} >

                <Stack direction={'row'} justifyContent="space-between" >
                    <ImageUpload />
                    <Box>
                        {isfirstFood ? null :
                            <IconButton
                                onClick={removeFoods}
                                sx={{
                                    background: "#D32F2F",
                                    boxShadow: "0px 4px #9F2323",
                                    transform: 'translate(0px, -2px)',
                                    transition: '0.1s ease',
                                    ":active": {
                                        boxShadow: "0px 0px #9F2323",
                                        transform: 'translate(0px, 0px)',
                                    },
                                    ":hover": {
                                        background: "#D32F2F"
                                    }
                                }}
                            ><ClearIcon sx={{ color: 'white' }} /></IconButton>
                        }
                    </Box>
                </Stack>

                <Stack direction="row" alignItems={'center'} spacing={1} mb={1}>
                    <TextField fullWidth id="" placeholder="Food Name" variant="outlined" size='small' />
                    <TextField fullWidth id="" placeholder="$" variant="outlined" size='small' />
                </Stack>

                <TextField sx={{ mb: 1 }} fullWidth id="" placeholder="Description" variant="outlined" size='small' />

                <Stack spacing={0.5}>
                    <Option isfirstOpt={true} />
                    {opts.map((_, index) => {
                        return (
                            <Option key={index} removeOpt={removeOpt} />
                        )
                    })}
                </Stack>

                <Stack alignItems={'end'} >
                    <IconButton onClick={addOpt}>
                        <AddCircleOutlineIcon sx={{ color: '#196CC0' }} />
                    </IconButton>
                </Stack>

            </Card>

        </>
    )
}
const Option = ({ isfirstOpt, removeOpt }) => {
    const [subOpts, setSubOpts] = useState([]);
    const addSubOpt = () => {
        setSubOpts([...subOpts, {}]);
    }
    const removeSubOpt = () => {
        const newSubOpts = [...subOpts];
        newSubOpts.pop();
        setSubOpts(newSubOpts);
    }
    return (
        <>
            <Card id="foodCard" sx={{ padding: 1 }}>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                        {/* <Typography>Option</Typography> */}
                        <TextField id="" placeholder="Option Name: e.g. Drink" variant="outlined" size="small" />
                        {isfirstOpt ? null :
                            <IconButton onClick={removeOpt}>
                                <RemoveCircleOutlineIcon color='error' />
                            </IconButton>
                        }
                    </Stack>

                    <Stack id="subOpts" spacing={1}>
                        <SubOption isfirst={true} />
                        {subOpts.map((number, index) => {
                            return (
                                <SubOption key={index} removeSubOpt={removeSubOpt} />
                            )
                        })}
                    </Stack>

                    <Stack alignItems={'start'}>
                        <IconButton onClick={addSubOpt}><AddIcon color='primary' /></IconButton>
                    </Stack>

                </Stack>
            </Card>

        </>
    )
}
const SubOption = ({ isfirst, removeSubOpt }) => {
    return (
        <>
            <Stack direction={'row'} spacing={1}>
                {isfirst ? null :
                    <IconButton onClick={removeSubOpt}><RemoveIcon color='error' /></IconButton>
                }
                <TextField fullWidth id="" placeholder="Option e.g. water" variant="outlined" size="small" />
                <TextField fullWidth id="" placeholder="Price e.g. free" variant="outlined" size="small" />
            </Stack>
        </>
    )
}

const ConfDiag = ({ openDia, handleDia }) => {
    return (

        <Dialog
            open={openDia}
            onClose={handleDia}
        >
            <DialogTitle >
                {"Are you sure you want to cancel this order"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Setting the "Cancel" button to red can help prevent staff from making mistakes due to impatience.
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button href="/restaurantAdmin" onClick={handleDia} color='error' sx={{ mr: 1 }}>Cancel</Button>
                <Button onClick={handleDia}
                    disableRipple={true}
                    sx={{
                        color: "white",
                        background: "#368FE7",
                        boxShadow: "0px 4px #1566B7",
                        transform: 'translate(0px, -2px)',
                        transition: '0.1s ease',
                        ":active": {
                            background: "#368FE7",
                            boxShadow: "0px 0px #1566B7",
                            transform: 'translate(0px, 0px)',
                        },
                        ":hover": {
                            background: "#368FE7",

                        }
                    }}
                >Back</Button>
            </DialogActions>
        </Dialog>
    )
}

const CreateBtn = ({ text, handleDia, color = "white", bgcolor = "#F7DB30", boxShadow = "#EF9D00" }) => {
    return (
        <Button
            onClick={handleDia}
            disableRipple={true}
            sx={{
                height: 38,
                color: color,
                background: bgcolor,
                boxShadow: `0px 4px ${boxShadow}`,
                transform: 'translate(0px, -2px)',
                transition: '0.1s ease',
                ":active": {
                    boxShadow: `0px 0px ${boxShadow}`,
                    transform: 'translate(0px, 0px)',
                    height: 40
                },
                ":hover": {
                    background: bgcolor
                }
            }}
        >
            <Typography fontWeight={1000}>{text}</Typography>
        </Button>
    )
}

export default function NewMenu({status}) {
    const state = location.state

    const [foods, setFoods] = useState([]);
    const [openDia, setOpenDia] = useState(false);
    const handleDia = () => {
        setOpenDia(!openDia);
    }

    const handleBack = () => {
        window.location.href = "/restaurantAdmin/orders"
    }

    const tableStyle = {
        border: '1px solid',
        borderCollapse: 'collapse',

    };

    const cellStyleHead = {
        border: '1px solid',
        padding: '5px',
        whiteSpace: "noWrap",
        backgroundColor: "#EDF5FD",
        fontWeight: 'bold',
        width: '200px'

    };

    const cellStyle = {
        border: '1px solid',
        padding: '5px',
        whiteSpace: "noWrap",
        width: '300px'
    };


    return (
        <>
            <Grid container
                spacing={2}
            >
                <Grid item xs={12} direction={'row'}>
                    <Typography><Link href="/restaurantAdmin/orders">Orders</Link> {"> Orders Modify"} </Typography>
                </Grid>

                {/* menu name */}
                <Grid item xs={12}>

                    <Stack direction={'row'} justifyContent={'space-between'} >
                        <Stack spacing={1}>


                            <table style={tableStyle} >
                                <tr>
                                    <td><Typography variant='h6' p={0.5}>Order Details</Typography></td>
                                </tr>
                                <tr >
                                    <td style={cellStyleHead}>Order ID:</td>
                                    <td style={cellStyle}>202311221712010001</td>
                                </tr>
                                <tr>
                                    <td style={cellStyleHead}>Order Date/Time:</td>
                                    <td style={cellStyle}>2023-11-23 17:12</td>
                                </tr>
                                <tr>
                                    <td style={cellStyleHead}>Status:</td>
                                    <td style={cellStyle}>{status}</td>
                                </tr>
                                <tr>
                                    <td style={cellStyleHead}>Delivery Method:</td>
                                    <td style={cellStyle}>Pick Up</td>
                                </tr>
                            </table>


                            <table style={tableStyle}>
                                <tr>
                                    <td><Typography variant='h6' p={0.5}>Customer Details</Typography></td>
                                </tr>
                                <tr>
                                    <td style={cellStyleHead}>Name:</td>
                                    <td style={cellStyle}>Sky Wong</td>
                                </tr>
                                <tr>
                                    <td style={cellStyleHead}>Content:</td>
                                    <td style={cellStyle}>87533578</td>
                                </tr>
                            </table>
                        </Stack>


                        <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            spacing={1}
                        >

                            <CreateBtn text={"Cancel"} bgcolor={"#D33232"} boxShadow={"#9F2323"} handleDia={handleDia} />
                            <CreateBtn text={"Back"} bgcolor={"#41668B"} boxShadow={"#2E4761"} handleDia={handleBack} />
                        </Stack>
                    </Stack>
                </Grid>


                {/* card info */}
                <Grid item xs={12}>
                    <Divider variant="insert" sx={{ mb: 2 }} />



                    <table style={tableStyle}>
                        <tr>
                            <td><Typography variant='h6' p={0.5}>Order Food Details</Typography></td>
                        </tr>
                        <tr >
                            <td style={cellStyleHead}>Restaurant:</td>
                            <td style={cellStyle}>Japanese Restaurant</td>
                        </tr>
                        <tr>
                            <td style={cellStyleHead}>Address1:</td>
                            <td style={cellStyle}>19 Tsing Wun Road, Tuen Mun</td>
                        </tr>
                        <tr>
                            <td style={cellStyleHead}>Address2:</td>
                            <td style={cellStyle}>Tuen Mun</td>
                        </tr>
                        <tr>
                            <td style={cellStyleHead}>Address3:</td>
                            <td style={cellStyle}>.</td>
                        </tr>
                        <tr>
                            <td style={cellStyleHead}>Food:</td>
                            <td style={cellStyle}>(Lunch A, meal, water, noodles) ( Lunch B, meal, water, noodles )</td>
                        </tr>
                        <tr>
                            <td style={cellStyleHead}>Drink:</td>
                            <td style={cellStyle}>(Water), (Water)</td>
                        </tr>
                        <tr>
                            <td style={cellStyleHead}>Total Price($):</td>
                            <td style={cellStyle}>888</td>
                        </tr>
                    </table>
                </Grid>
            </Grid>
            <ConfDiag openDia={openDia} handleDia={handleDia} />
        </>
    );
}

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
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControlLabel,
    Switch
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Link, useLocation, useNavigate } from 'react-router-dom'

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
            <Card direction={'col'} sx={{ padding: 1, bgcolor: '#FCF7EE' }} spacing={1} >

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
                    <TextField fullWidth id="" placeholder="Food Name" variant="outlined" size='small' sx={{ background: "white" }} defaultValue="Food A" />
                    <TextField fullWidth id="" placeholder="$" variant="outlined" size='small' sx={{ background: "white" }} defaultValue="100" />
                </Stack>

                <TextField sx={{ mb: 1, background: "white" }} fullWidth id="" placeholder="Description" variant="outlined" size='small' defaultValue="This is Food A" />

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
                    <Grid container direction="row" alignItems={'center'}>
                        <Grid item width="50%">
                            <TextField id="" placeholder="Option Name: e.g. Drink" variant="outlined" size="small" defaultValue={isfirstOpt ? "Drink" : ""} />
                        </Grid>

                        <Grid container width="50%" direction="row" alignItems={'center'} justifyContent={'space-between'}>
                            <Grid item  m={1}>
                                <FormControlLabel required control={<Switch />} label="Required" />
                            </Grid>

                            <Grid item>
                                {isfirstOpt ? null :
                                    <IconButton onClick={removeOpt}>
                                        <RemoveCircleOutlineIcon color='error' />
                                    </IconButton>
                                }
                            </Grid>

                        </Grid>
                    </Grid>

                    <Stack id="subOpts" spacing={1}>
                        <SubOption isFirstSubOpt={true} isfirstOpt={isfirstOpt} />
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
const SubOption = ({ isFirstSubOpt, isfirstOpt, removeSubOpt }) => {
    return (
        <>
            <Stack direction={'row'} spacing={1}>
                {isFirstSubOpt ? null :
                    <IconButton onClick={removeSubOpt}><RemoveIcon color='error' /></IconButton>
                }
                <TextField fullWidth id="" placeholder="Option e.g. water" variant="outlined" size="small" defaultValue={(isfirstOpt) ? "water" : ""} />
                <TextField fullWidth id="" placeholder="Price e.g. free" variant="outlined" size="small" defaultValue={(isfirstOpt) ? "free" : ""} />
            </Stack>
        </>
    )
}

const CustDial = ({ openDia, handleFunc, text = "Create" }) => {
    return (
        <Dialog
            open={openDia}
            onClose={handleFunc}
        >
            <DialogTitle >
                {"Are you sure you want to " + text + " this order"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Setting the {text} button to red can help prevent staff from making mistakes due to impatience.
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button href="/restaurantAdmin" onClick={handleFunc} color='error' sx={{ mr: 1 }}>{text}</Button>
                <Button onClick={handleFunc}
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
                >Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

const CustBtn = ({ text = "Update", color = "white", bgcolor = "#368FE7", shadow = "#1566B7", handleFunc }) => {
    return (
        <Button
            onClick={handleFunc}
            disableRipple={true}
            sx={{
                mr: 1,
                height: 38,
                color: color,
                background: bgcolor,
                boxShadow: "0px 4px " + shadow,
                transform: 'translate(0px, -2px)',
                transition: '0.1s ease',
                ":active": {
                    background: "#368FE7",
                    boxShadow: "0px 0px " + shadow,
                    transform: 'translate(0px, 0px)',
                    height: 40
                },
                ":hover": {
                    background: bgcolor,
                }
            }}
        >
            <Typography fontWeight={1000}>{text}</Typography>
        </Button>
    )
}

export default function ModifyMenu() {

    const [foods, setFoods] = useState([]);
    const addFoods = () => {
        setFoods([...foods, {}]);
    }
    const removeFoods = () => {
        const newFoods = [...foods];
        newFoods.pop();
        setFoods(newFoods);
    }
    const [openDia, setOpenDia] = useState(false);

    const [diaText, setDiaText] = useState("");

    const handleDia = ({ text = "Update" }) => {
        setDiaText(text)
        setOpenDia(!openDia);
    }

    const handCloseDia = () => {
        setOpenDia(false)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography><Link to="/restaurantAdmin">Menus</Link> {"> Modify Menu"} </Typography>
                </Grid>

                {/* menu name */}
                <Grid item xs={12}>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
                        <TextField id="" variant="outlined" placeholder='Menu Name' size='small' defaultValue={"Menu 1"} />
                        <Stack direction={'row'}>
                            <CustBtn text='Delete' bgcolor="#D32F2F" shadow='#9F2323'
                                handleFunc={() => handleDia({ text: "Delete" })} />
                            <CustBtn handleFunc={handleDia} />

                        </Stack>
                    </Stack>
                </Grid>

                {/* card info */}
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Food isfirstFood={true} />
                        {foods.map((_, index) => {
                            return (
                                <Food key={index} removeFoods={removeFoods} />
                            )
                        })}
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <IconButton
                            sx={{
                                height: 38,
                                color: "white",
                                background: "#368FE7",
                                boxShadow: "0px 4px #1566B7",
                                transform: 'translate(0px, -2px)',
                                transition: '0.1s ease',
                                ":active": {
                                    background: "#368FE7",
                                    boxShadow: "0px 0px #1566B7",
                                    transform: 'translate(0px, 0px)',
                                    height: 40
                                },
                                ":hover": {
                                    background: "#368FE7",
                                }
                            }}
                            onClick={addFoods}
                        ><AddIcon /></IconButton>

                        <CustBtn handleFunc={handleDia} />
                    </Stack>
                </Grid>
            </Grid>
            <CustDial text={diaText} openDia={openDia} handleFunc={handCloseDia} />
        </>
    );
}

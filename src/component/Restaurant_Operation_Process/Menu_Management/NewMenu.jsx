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
    FormControlLabel,
    Switch 
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
                    <Grid container direction="row" alignItems={'center'}>
                        <Grid item width="50%">
                            <TextField id="" placeholder="Option Name: e.g. Drink" variant="outlined" size="small"/>
                        </Grid>

                        <Grid container width="50%" direction="row" alignItems={'center'} justifyContent={'space-between'}>
                            <Grid item m={1}>
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
                {"Are you sure you want to create this Menu"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Setting the "Create" button to red can help prevent staff from making mistakes due to impatience.
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button href="/restaurantAdmin" onClick={handleDia} color='error' sx={{ mr: 1 }}>Create</Button>
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
                >Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

const CreateBtn = ({ handleDia }) => {
    return (
        <Button
            onClick={handleDia}
            disableRipple={true}
            sx={{
                height: 38,
                color: "#56350F",
                background: "#F7DB30",
                boxShadow: "0px 4px #EF9D00",
                transform: 'translate(0px, -2px)',
                transition: '0.1s ease',
                ":active": {
                    boxShadow: "0px 0px #EF9D00",
                    transform: 'translate(0px, 0px)',
                    height: 40
                },
                ":hover": {
                    background: "#F7DB30"
                }
            }}
        >
            <Typography fontWeight={1000}>Create</Typography>
        </Button>
    )
}

export default function NewMenu() {

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
    const handleDia = () => {
        setOpenDia(!openDia);
    }
    return (
        <>
            <Grid container
                spacing={2}
            >
                <Grid item xs={12} direction={'row'}>
                    <Typography><Link href="/restaurantAdmin">Menus</Link> {"> New Menu"} </Typography>
                </Grid>

                {/* menu name */}
                <Grid item xs={12}>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
                        <Grid item>
                            <TextField id="" variant="outlined" placeholder='Menu Name' size='small' />
                        </Grid>
                        <Grid item>
                            <CreateBtn handleDia={handleDia} />
                        </Grid>
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
                                color: "black",
                                marginRight: 5,
                                background: "#FEC81A",
                                boxShadow: "0px 4px #D19C2A",
                                transform: 'translate(0px, -2px)',
                                transition: '0.1s ease',
                                ":active": {
                                    boxShadow: "0px 0px #D19C2A",
                                    transform: 'translate(0px, 0px)',
                                },
                                ":hover": {
                                    background: "#FEC81A"
                                }
                            }}
                            onClick={addFoods}
                        ><AddIcon /></IconButton>

                        <CreateBtn handleDia={handleDia} />
                    </Stack>
                </Grid>
            </Grid>
            <ConfDiag openDia={openDia} handleDia={handleDia} />
        </>
    );
}

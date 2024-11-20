import * as React from 'react';
import { useState, useEffect } from 'react';
// material-ui
import {
    Avatar,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Chip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import cust_order from "/src/component/data/cust_order.json"
import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortDescendingLetters } from "react-icons/tb";
import ClearIcon from '@mui/icons-material/Clear';


const NewOrder = ({ orderID, setIsShow }) => {
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        const progress = setInterval(() => {
            setProgress((prevorderState) => {
                if (prevorderState === 150) {
                    setIsShow(false)
                    return prevorderState;
                }
                return prevorderState + 1;
            });
        }, 50);

        return () => {
            clearInterval(progress);
        };
    }, []);

    return (
        <>
            <TableRow sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                ":hover": {
                    background: "aliceblue"
                }
            }}>
                <TableCell align='left' >
                    {/* sx={{ width: "30%" }}  */}
                    <Stack alignItems="center" direction="row" spacing={2}>

                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                            {"202311221712010001"}
                        </Typography>
                    </Stack>

                </TableCell>
                <TableCell align="left" >
                    {/* sx={{ width: "20%" }} */}
                    <Stack>
                        <Typography variant="subtitle2">
                            {"Sky Wong"}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="left" >
                    {/* sx={{ width: "20%" }} */}
                    <Stack>
                        <Typography variant="subtitle2">
                            2023-11-22 17:12
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell align="left" >
                    <Stack>
                        <Chip
                            label={(progress > 99) ? "Order Received" : "Order Processing"}
                            sx={{
                                border: '1px solid black',
                                background: `linear-gradient(90deg, ${(progress > 99) ? '#95eb00' : '#96B2CE'} ${progress}%, #EDF5FD ${progress}%)`,
                                color: 'black',
                            }}
                        />
                    </Stack>
                </TableCell>

                <TableCell align="center" >
                    <IconButton
                        size="large"
                        disableRipple={true}
                        sx={{
                            color: "snow",
                            background: "#D33232",
                            boxShadow: "0px 4px #9F2323",
                            transform: 'translate(0px, -2px)',
                            transition: '0.1s ease',
                            ":active": {
                                background: "#D33232",
                                boxShadow: "0px 0px #9F2323",
                                transform: 'translate(0px, 0px)',
                            },
                        }}
                        onClick={() => setIsShow(false)}
                    >
                        <ClearIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}

export default function OrderAccept() {

    const [currCust_order, setCurrCust_order] = useState([]);
    const [isShow, setIsShow] = useState(true);

    const handleIsShow = () => {
        setIsShow(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrCust_order((prevCurrCust_order) => [
                ...prevCurrCust_order,
                isShow
            ]);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Grid item xs={12}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    <Typography variant='subtitle2'>Order ID</Typography>
                                </TableCell >
                                <TableCell align="left" >
                                    <Typography variant='subtitle2'>Customer Name</Typography>

                                </TableCell>
                                <TableCell align="left" >
                                    <Typography variant='subtitle2'>Order Date/Time</Typography>
                                </TableCell>

                                <TableCell align="center" >
                                    <Typography variant='subtitle2'>Status</Typography>
                                </TableCell>

                                <TableCell align="center" >
                                    <Typography variant='subtitle2'>Reject</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {isShow && <NewOrder setIsShow={setIsShow} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>


        </>
    );
}

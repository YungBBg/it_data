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

import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import cust_order from "/src/component/data/cust_order.json"
import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortDescendingLetters } from "react-icons/tb";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";



const SortButton = ({ isAsc, handleAsc, title, ascIcon=<TbSortAscendingLetters size={24} />, dscIcon=<TbSortDescendingLetters size={24} /> }) => {
    return <>
        <Stack alignItems="center" direction="row" spacing={1}  >
            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                {title}
            </Typography>
            <IconButton onClick={handleAsc}
                disableRipple={true}
                sx={{
                    color: "snow",
                    borderRadius: 2,
                    marginRight: 5,
                    background: "#368FE7",
                    boxShadow: isAsc ? "0px 4px #1566B7" : "0px 0px #1566B7",
                    transform: isAsc ? 'translate(0px, -2px)' : 'translate(0px, 0px)',
                    transition: '0.2s ease',
                    ":active": {
                        background: "#368FE7",
                        boxShadow: "0px 0px #1566B7",
                        transform: 'translate(0px, 0px)',
                    },
                }}
            >
                {isAsc ? ascIcon : dscIcon}
            </IconButton>
        </Stack>
    </>
}

const FilterButton = ({ searchType, handleSearchType, searchText, handleSearch }) => {

    return <>

        <FormControl sx={{ m: 1, width: 130 }} size="medium">
            <Select
                value={searchType}
                onChange={handleSearchType}
            >
                <MenuItem value={"orderID"}>
                    <Typography gutterBottom variant="body" >Order ID</Typography>
                </MenuItem>

                <MenuItem value={"custName"}>
                    <Typography gutterBottom variant="body" >Customer Name</Typography>
                </MenuItem>

                <MenuItem value={"status"}>
                    <Typography gutterBottom variant="body">Status</Typography>
                </MenuItem>
            </Select>
        </FormControl >

        <input list="orderlist" type="text"
            placeholder={searchType === "orderID" ? "Order ID..." :
                searchType === "custName" ? "Customer Name..." : "Status..."}
            value={searchText}
            onChange={(event) => handleSearch(event.target.value)}
            style={{
                margin: "8px",
                border: "1px solid #C4C4C4",
                borderRadius: "4px",
                height: "56px",
                width: "200px",
                padding: "16.5px 14px"
            }}>
        </input>
        <datalist id="orderlist" >
            {cust_order.map((order, index) => {
                return (
                    <>
                        <option
                            id={index}
                            label={
                                searchType === "orderID" ? order.orderID :
                                    searchType === "custName" ? order.custName : order.state
                            }
                            value={
                                searchType === "orderID" ? order.orderID :
                                    searchType === "custName" ? order.custName : order.state
                            }
                        />
                    </>
                )
            })}
        </datalist>
    </>
}

export default function Orders() {
    // filter button
    const [isOrderIDAsc, setIsOrderIDAsc] = useState(true);
    const [isCustName, setIsCustNameAsc] = useState(true);
    const [isStatusAsc, setIsStatusAsc] = useState(true);
    const [isOrderDateAsc, setIsOrderDateAsc] = useState(true);
    // search bar
    const [searchType, setSearchType] = useState("orderID");
    const [searchText, setSearchText] = useState("");
    const [currCust_order, setCurrCust_order] = useState(cust_order);

    // filter button
    const handleOrderIDAsc = () => {
        setIsOrderIDAsc(!isOrderIDAsc)
        setIsCustNameAsc(true)
        setIsOrderDateAsc(true)
        setIsStatusAsc(true)
        setCurrCust_order(
            (isOrderIDAsc) ?
                currCust_order.sort((prev, post) => post.orderID.localeCompare(prev.orderID)) :
                currCust_order.sort((prev, post) => prev.orderID.localeCompare(post.orderID))
        )
    }
    const handleCustNameAsc = () => {
        setIsOrderIDAsc(true)
        setIsCustNameAsc(!isCustName)
        setIsOrderDateAsc(true)
        setIsStatusAsc(true)
        setCurrCust_order(
            (isCustName) ?
                currCust_order.sort((prev, post) => post.custName.localeCompare(prev.custName)) :
                currCust_order.sort((prev, post) => prev.custName.localeCompare(post.custName))
        )
    }

    const handleOrderDateAsc = () => {
        setIsOrderIDAsc(true)
        setIsCustNameAsc(true)
        setIsOrderDateAsc(!isOrderDateAsc)
        setIsStatusAsc(true)
        setCurrCust_order(
            (isOrderDateAsc) ?
                currCust_order.sort((prev, post) => {
 
                    prev = prev.orderTime.split(" ");
                    post = post.orderTime.split(" ");
                    const date2 = new Date(prev[0]+"T"+prev[1]);
                    const date1 = new Date(post[0]+"T"+post[1]);
                    return date1 - date2;
                }) :
                currCust_order.sort((prev, post) => {
                    prev = prev.orderTime.split(" ");
                    post = post.orderTime.split(" ");
                    const date1 = new Date(prev[0]+"T"+prev[1]);
                    const date2 = new Date(post[0]+"T"+post[1]);
                    return date1 - date2;
                })
        )
    }

    const handleStatusAsc = () => {
        setIsOrderIDAsc(true)
        setIsCustNameAsc(true)
        setIsOrderDateAsc(true)
        setIsStatusAsc(!isStatusAsc)
        setCurrCust_order(
            (isStatusAsc) ?
                currCust_order.sort((prev, post) => post.state.localeCompare(prev.state)) :
                currCust_order.sort((prev, post) => prev.state.localeCompare(post.state))
        )
    }
    //searchbar
    const handleSearchType = (event) => {
        setSearchType(event.target.value);
        setSearchText("")
        setIsOrderIDAsc(true)
        setIsCustNameAsc(true)
        setIsStatusAsc(true)
    };
    const handleSearch = (value) => {
        setSearchText(value)
    };

    useEffect(() => {
        setCurrCust_order(cust_order.filter((order) => {
            return (
                (searchType == "orderID") ?
                    order.orderID.includes(searchText) :
                    (searchType == "custName") ?
                        order.custName.includes(searchText) :
                        order.state.includes(searchText)
            )
        }))
    }, [searchText])

    return (
        <>
            <Grid item xs={12}>
                <FilterButton searchType={searchType} handleSearchType={handleSearchType} searchText={searchText} handleSearch={handleSearch} />
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <SortButton isAsc={isOrderIDAsc} handleAsc={handleOrderIDAsc} title={"Order ID"} />
                                </TableCell >
                                <TableCell align="left" >
                                    <SortButton isAsc={isCustName} handleAsc={handleCustNameAsc} title={"Customer"} />
                                </TableCell>
                                {/* <TableCell align="left" >
                                    <SortButton isAsc={isCustName} handleAsc={handleCustNameAsc} title={"Order Time"} />
                                </TableCell> */}
                                <TableCell align="left" >
                                    <SortButton isAsc={isOrderDateAsc} handleAsc={handleOrderDateAsc} title={"Order Date/Time"} 
                                    ascIcon={<TbSortAscendingNumbers  size={24}/>} dscIcon={<TbSortDescendingNumbers  size={24}/>}
                                    />
                                </TableCell>

                                <TableCell align="left" >
                                    <SortButton isAsc={isStatusAsc} handleAsc={handleStatusAsc} title={"Status"} />
                                </TableCell>
                                <TableCell />

                                {/* <TableCell align="center" >
                                    <Button
                                        href='/src/component/LoginRegister/R-Register.html'
                                        disableRipple={true}
                                        startIcon={<AddBusinessIcon size={24} />}
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
                                    >
                                        <Typography variant="subtitle2" fontWeight={1000}>
                                            NEW Restaurant
                                        </Typography>
                                    </Button>
                                </TableCell> */}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currCust_order.map((order, index) => {
                                return (
                                    <>
                                        <TableRow key={index} sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            ":hover": {
                                                background: "aliceblue"
                                            }
                                        }}>
                                            <TableCell align='left' >
                                                {/* sx={{ width: "30%" }}  */}
                                                <Stack alignItems="center" direction="row" spacing={2}>
                                                    {/* <Avatar
                                                        size="md"
                                                        variant="rounded"
                                                        src={order.img}
                                                    /> */}
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                                        {order.orderID}
                                                    </Typography>
                                                </Stack>

                                            </TableCell>
                                            <TableCell align="left" >
                                                {/* sx={{ width: "20%" }} */}
                                                <Stack>
                                                    <Typography variant="subtitle2">
                                                        {order.custName}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left" >
                                                {/* sx={{ width: "20%" }} */}
                                                <Stack>
                                                    <Typography variant="subtitle2">
                                                        {order.orderTime}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="left" >
                                                {/* sx={{ width: "20%" }} */}
                                                <Stack>
                                                    {/* <Typography variant="subtitle2">
                                                        {order.state}
                                                    </Typography> */}
                                                    <Chip label={order.state}
                                                        color={
                                                            order.state == "Order Received"
                                                                ? "default" :
                                                                order.state == "Preparing"
                                                                    ? "warning" :
                                                                    order.state == "Out for Delivery"
                                                                        ? "primary" :
                                                                        order.state == "Delivered"
                                                                            ? "secondary" :
                                                                            order.state == "Order Cancelled"
                                                                                ? "error" : "success"
                                                        }
                                                    />

                                                </Stack>
                                            </TableCell>

                                            <TableCell align="center" >

                                                <Link to={'/restaurantAdmin/ordersModify'} state={{ status: order.state, orderID: order.orderID }}>

                                                    <IconButton
                                                        size="large"
                                                        disableRipple={true}
                                                        sx={{
                                                            color: "snow",
                                                            marginRight: 5,
                                                            background: "#368FE7",
                                                            boxShadow: "0px 4px #1566B7",
                                                            transform: 'translate(0px, -2px)',
                                                            transition: '0.1s ease',
                                                            ":active": {
                                                                background: "#368FE7",
                                                                boxShadow: "0px 0px #1566B7",
                                                                transform: 'translate(0px, 0px)',
                                                            },
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                        {/* <Link to={'/restaurantAdmin/ordersModify'} >more</Link> */}
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>


        </>
    );
}

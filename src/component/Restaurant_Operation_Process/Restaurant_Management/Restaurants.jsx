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
    Select
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { useTheme } from '@mui/material/styles';
import menus from "/src/component/data/menus.json"
import { MdOutlinePlaylistAdd } from "react-icons/md";

import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortAscendingNumbers, TbSortDescendingNumbers } from 'react-icons/tb'
import { TbSortDescendingLetters } from "react-icons/tb";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const SortButton = ({ isAsc, handleAsc, title }) => {
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
                {isAsc ? <TbSortAscendingLetters size={24} /> : <TbSortDescendingLetters size={24} />}
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
                <MenuItem value={"rest"}>
                    <Typography gutterBottom variant="body" >Restaurant</Typography>
                </MenuItem>

                <MenuItem value={"type"}>
                    <Typography gutterBottom variant="body" >Type</Typography>
                </MenuItem>

                <MenuItem value={"menu"}>
                    <Typography gutterBottom variant="body">Menu</Typography>
                </MenuItem>
            </Select>
        </FormControl >

        <input list="menuInfolist" type="text"
            placeholder={searchType === "rest" ? "Restaurant..." :
                searchType === "type" ? "Type..." : "Menu..."}
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
        <datalist id="menuInfolist" >
            {menus.map((menu, index) => {
                return (
                    <>
                        <option
                            id={index}
                            label={
                                searchType === "rest" ? menu.restaurant :
                                    searchType === "type" ? menu.type : menu.menu
                            }
                            value={
                                searchType === "rest" ? menu.restaurant :
                                    searchType === "type" ? menu.type : menu.menu
                            }
                        />
                    </>
                )
            })}
        </datalist>

    </>
}

export default function Restaurants() {
    // const handleOpenUpdate = (event) => {
    //     event.preventDefault();
    //     setIsOpenUpdate(!isOpenUpdate);
    // }
    // const [isOpenUpdate, setIsOpenUpdate] = useState(false);

    // filter button
    const [isRestAsc, setIsRestAsc] = useState(true);
    const [isTypeAsc, setIsTypeAsc] = useState(true);
    const [isMenuAsc, setIsMenuAsc] = useState(true);
    // search bar
    const [searchType, setSearchType] = useState("rest");
    const [searchText, setSearchText] = useState("");
    const [currMenus, setCurrMenus] = useState(menus);

    // filter button
    const handleRestAsc = () => {
        setIsRestAsc(!isRestAsc)
        setIsTypeAsc(true)
        setIsMenuAsc(true)
        setCurrMenus(
            (isRestAsc) ?
            currMenus.sort((prev, post) => post.restaurant.localeCompare(prev.restaurant)) :
            currMenus.sort((prev, post) => prev.restaurant.localeCompare(post.restaurant))
        )
    }
    const handleTypeAsc = () => {
        setIsRestAsc(true)
        setIsTypeAsc(!isTypeAsc)
        setIsMenuAsc(true)
        setCurrMenus(
            (isTypeAsc) ?
            currMenus.sort((prev, post) => post.type.localeCompare(prev.type)) :
            currMenus.sort((prev, post) => prev.type.localeCompare(post.type))
        )

    }
    const handleMenuAsc = () => {
        setIsRestAsc(true)
        setIsTypeAsc(true)
        setIsMenuAsc(!isMenuAsc)
        setCurrMenus(
            (isMenuAsc) ?
            currMenus.sort((prev, post) => post.menu.localeCompare(prev.menu)) :
            currMenus.sort((prev, post) => prev.menu.localeCompare(post.menu))
        )
    }
    //searchbar
    const handleSearchType = (event) => {
        setSearchType(event.target.value);
        setSearchText("")
        setIsRestAsc(true)
        setIsTypeAsc(true)
        setIsMenuAsc(true)
    };
    const handleSearch = (value) => {
        setSearchText(value)
    };

    useEffect(() => {
        setCurrMenus(menus.filter((menu) => {
            return (
                (searchType == "rest") ?
                    menu.restaurant.includes(searchText) :
                    (searchType == "type") ?
                        menu.type.includes(searchText) :
                        menu.menu.includes(searchText)
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
                                <TableCell >
                                    <SortButton isAsc={isRestAsc} handleAsc={handleRestAsc} title={"Restaurant"} />
                                </TableCell >
                                <TableCell align="left" >
                                    <SortButton isAsc={isTypeAsc} handleAsc={handleTypeAsc} title={"Type"} />
                                </TableCell>
                                <TableCell align="left" >
                                    <SortButton isAsc={isMenuAsc} handleAsc={handleMenuAsc} title={"Menu"} />
                                </TableCell>

                                <TableCell align="center" >
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
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currMenus.map((menu, index) => {
                                return (
                                    <>
                                        <TableRow key={index} sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            ":hover": {
                                                background: "aliceblue"
                                            }
                                        }}>
                                            <TableCell align='left' sx={{ width: "30%" }} >
                                                <Stack alignItems="center" direction="row" spacing={2}>
                                                    <Avatar
                                                        size="md"
                                                        variant="rounded"
                                                        src={menu.img}
                                                    />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                                        {menu.restaurant}
                                                    </Typography>
                                                </Stack>

                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "20%" }}>
                                                <Stack>
                                                    <Typography variant="subtitle2">
                                                        {menu.type}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "20%" }}>
                                                <Stack>
                                                    <Typography variant="subtitle2">
                                                        {menu.menu}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="center" sx={{ width: "30%" }}>
                                                <IconButton 
                                                    href='/src/component/LoginRegister/Modify_Rest_Data.html'
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
                                                    onClick={(event) => handleOpenUpdate(event)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
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

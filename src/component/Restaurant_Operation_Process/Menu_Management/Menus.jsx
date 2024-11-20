import * as React from 'react';
import { useState, useEffect } from 'react';
// material-ui
import {
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
    Avatar
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import menus from "/src/component/data/menus.json"
import { MdOutlinePlaylistAdd } from "react-icons/md";

import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortDescendingLetters } from "react-icons/tb";
import SearchIcon from '@mui/icons-material/Search';

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

const FilterButton = ({ searchText, handleSearch }) => {

    return <>
    <Stack direction={'row'} alignItems={'center'} >

        <SearchIcon/>
        <input list="menuInfolist" type="text"
            placeholder={"Menu..."}
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
                                menu.menu
                            }
                            value={
                                menu.menu
                            }
                        />
                    </>
                )
            })}
        </datalist>
        </Stack>

    </>
}

export default function Menus() {
    // filter button
    const [isMenuAsc, setIsMenuAsc] = useState(true);
    // search bar
    const [searchText, setSearchText] = useState("");
    const [currMenus, setCurrMenus] = useState(menus);

    // filter button
    const handleMenuAsc = () => {
        // setIsRestAsc(true)
        // setIsTypeAsc(true)
        setIsMenuAsc(!isMenuAsc)
        setCurrMenus(
            (isMenuAsc) ?
                currMenus.sort((prev, post) => post.menu.localeCompare(prev.menu)) :
                currMenus.sort((prev, post) => prev.menu.localeCompare(post.menu))
        )
    }

    const handleSearch = (value) => {
        setSearchText(value)
    };

    useEffect(() => {
        setCurrMenus(menus.filter((menu) => {
            return (menu.menu.includes(searchText))
        }))
    }, [searchText])

    return (
        <>
            <Grid item xs={12}>
                <FilterButton searchText={searchText} handleSearch={handleSearch} />
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>

                                <TableCell align="center" >
                                    <SortButton isAsc={isMenuAsc} handleAsc={handleMenuAsc} title={"Menu"} />
                                </TableCell>

                                <TableCell align="center" >
                                    <Button
                                        href='/restaurantAdmin/newMenu'
                                        disableRipple={true}
                                        startIcon={<MdOutlinePlaylistAdd size={24} />}
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
                                            NEW MENU
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
                                            <TableCell/>
                                            <TableCell/>
                                            <TableCell/>

                                            <TableCell align='right'  >
                                                <Stack alignItems="center" direction="row" spacing={2}>
                                                    <Avatar
                                                        size="md"
                                                        variant="rounded"
                                                        src={menu.img}
                                                    />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                                        {menu.menu}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>


                                            <TableCell align="center">
                                                <IconButton
                                                    href="/restaurantAdmin/modifyMenu"
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

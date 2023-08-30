import React from "react";

import SearchResult from "./SearchResult";

import Pagination from '@mui/material/Pagination';
import { Button } from "@mui/material";

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import {changeResultsPage} from '../serverFunctions/serverFunctions'
const SearchResults = (props) => {

    const {searchResults, handleAddMealItem, deny, searchQuery, setSearchResults, handleServerErrors} = props;
    const pages = Math.ceil(searchResults[1].count / 5)

    const pageChangeHandler = (event, page) => {
        changeResultsPage(searchQuery, page)
        .then(res => setSearchResults(res))
        .catch(error => {
            handleServerErrors(error);
            deny();
        })
    }

    return (
        <div style={{maxHeight: 600, overflow: 'auto'}}>
            <h2>Search Results</h2>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults[0].map( result => {
                            return <SearchResult 
                                result = {result} 
                                handleAddMealItem = {handleAddMealItem}
                                key = {result.foodItemID}
                                deny = {deny}
                                />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
                <Button onClick = {deny} >Finish Search</Button>
                <Pagination count={pages} onChange = {pageChangeHandler}/>

        </div>

    )


}

export default SearchResults
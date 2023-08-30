import React, {useState} from "react";

import { Button, TextField } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import "../stylesheets/searchFoodItemResults.css"

const SearchResult = (props) => {
    const result = props.result;
    const handleAddMealItem = props.handleAddMealItem;

    const [amount, setAmount] = useState(0)

    const amountChangeHandler = (event) => {
        const theAmount = parseInt(event.target.value)
        if(theAmount > 0)
        {
            setAmount(theAmount)
        }
        else
        {
            //console.log("Invalid amount input")
        }
    }

    const addHandler = () => {
        handleAddMealItem(result, amount)
    }

    return(
        <TableRow className = "searchFoodItemResults">
            <TableCell>{result.name}</TableCell>
            <TableCell align="right">{result.calories}</TableCell>
            <TableCell align="right">{result.fat}</TableCell>
            <TableCell align="right">{result.carbs}</TableCell>
            <TableCell align="right">{result.protein}</TableCell>
            <TableCell align="right">
                <TextField 
                    value = {amount} 
                    onChange = {amountChangeHandler} 
                    type = "number" 
                    style = {{width: 75}}
                    />
            </TableCell>
            <TableCell align="right"><Button onClick = {addHandler}>Add</Button></TableCell>
        </TableRow>

    )
}

export default SearchResult;
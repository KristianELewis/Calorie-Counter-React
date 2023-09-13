import React, {useState} from "react";

import { Button, TextField } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import "../stylesheets/searchFoodItemResults.css"

const SearchResult = (props) => {
    const result = props.result;
    const handleAddMealItem = props.handleAddMealItem;

    const [amount, setAmount] = useState(0)



    /*
        this is like this right now for testing purposes, The style of the app should change, such that names do not need to be cut off
    */
    let smallString = ""
    if(result.name.length > 20)
    {
        smallString = result.name.substring(0, 20)
    }
    else{
        smallString = result.name;
    }


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
                            {/*parseFloat((mealItem.calories * .amount).toFixed(2))*/}

    return(
        <TableRow className = "searchFoodItemResults">
            {/*need short version of name here */}
            <TableCell style={{width: '200px'}}>{result.name}</TableCell>
            <TableCell>{result.brand}</TableCell>

            <TableCell align="right">{parseFloat((result.calories).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((result.servingSize).toFixed(2))} {result.servingUnit}</TableCell>
            <TableCell align="right">{parseFloat((result.fat).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((result.carbs).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((result.protein).toFixed(2))}</TableCell>
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
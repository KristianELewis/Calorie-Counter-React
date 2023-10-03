import React, {useState} from "react";


//MaterialUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import "../stylesheets/searchFoodItemResults.css"

const SearchResult = (props) => {
    const result = props.result;
    const handleAddMealItem = props.handleAddMealItem;

    const [amount, setAmount] = useState(0)

    const amountChangeHandler = (event) => {
        const theAmount = parseInt(event.target.value)
        if(theAmount >= 0)
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

    const selectFood = () => {
        console.log("Yo")
    }

    return(
        <>
            <TableRow className = "searchFoodItemResults" hover onClick = {selectFood}>
                <TableCell style={{width: '150px'}}>
                    <p style = {{marginTop : "0px", marginBottom : "0px"}}>{result.name}</p>
                    <p style = {{fontSize: "10px", marginTop : "5px", marginBottom : "0px"}}>{result.brand}</p>
                </TableCell>
                <TableCell align="right">{parseFloat((result.servingSize).toFixed(2))} {result.servingUnit}</TableCell>
                <TableCell align="right">{parseFloat((result.calories).toFixed(2))}</TableCell>
                <TableCell align="right">{parseFloat((result.fat).toFixed(2))}</TableCell>
                <TableCell align="right">{parseFloat((result.carbs).toFixed(2))}</TableCell>
                <TableCell align="right">{parseFloat((result.protein).toFixed(2))}</TableCell>

            </TableRow>
                    <TextField 
                    value = {amount} 
                    size = "small"
                    onChange = {amountChangeHandler} 
                    type = "number" 
                    style = {{width: "75px", paddingBottom: "5px"}}
                    />
                    <Button onClick = {addHandler}>Add</Button>
        </>
    )
}

export default SearchResult;
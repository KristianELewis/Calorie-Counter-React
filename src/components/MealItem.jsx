import React from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

const MealItem = (props) => {
        
    const mealItem = props.mealItem;
    
    const handleOpen = () => {
        props.handleOpen(mealItem.loggedID)
    }
    const handleOpenDelete = () => {
        props.handleOpenDelete(mealItem.loggedID)
    }
    return (
        <>
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="mealItem"> {mealItem.name}</TableCell>
            <TableCell align="right">{mealItem.calories * mealItem.amount}</TableCell>
            <TableCell align="right">{mealItem.fat * mealItem.amount}</TableCell>
            <TableCell align="right">{mealItem.carbs * mealItem.amount}</TableCell>
            <TableCell align="right">{mealItem.protein * mealItem.amount}</TableCell>
            <TableCell align="right">{mealItem.amount}</TableCell>
            <TableCell align="right">
                <Button onClick = {handleOpen}>UPDATE</Button>
            </TableCell>
            <TableCell align="right">
                <Button onClick = {handleOpenDelete}>DELETE</Button>
            </TableCell>
        </TableRow>

    </>
    )
}

export default MealItem;
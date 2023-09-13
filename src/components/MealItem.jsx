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
            {/*
            
            not sure if there is a better way to do this, this will give a max decimal length of 2, but without always having 0s and no scientific notation
            parseFloat((mealItem.calories * .amount).toFixed(2))

            */}
            <TableCell component="th" scope="mealItem" className ="mealItemName" style={{width: '200px'}}> {mealItem.name}</TableCell>
            <TableCell align="right">{mealItem.servingSize} {mealItem.servingUnit}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.calories * mealItem.amount).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.fat * mealItem.amount).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.carbs * mealItem.amount).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.protein * mealItem.amount).toFixed(2))}</TableCell>
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
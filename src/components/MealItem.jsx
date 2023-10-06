import React from 'react';

//materialUI
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
//import CloseIcon from '@mui/icons-material/Close';

const MealItem = (props) => {
        
    const mealItem = props.mealItem;

    const handleOpen = () => {
        props.handleOpenMealItemInfo(mealItem.loggedID, mealItem)
    }
    return (
        <>
        <TableRow
            hover
            sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                "&:hover" : {
                    cursor : "pointer"
                } 

            }}
            onClick = {handleOpen}
        >
            {/*
            
            not sure if there is a better way to do this, this will give a max decimal length of 2, but without always having 0s and no scientific notation
            parseFloat((mealItem.calories * .amount).toFixed(2))

                T

            */}
            <TableCell component="th" scope="mealItem" className ="mealItemName" style={{width: '150px'}}>{mealItem.name} - {mealItem.amount} servings</TableCell>
            <TableCell align="right">{mealItem.servingSize} {mealItem.servingUnit}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.calories * mealItem.amount).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.fat * mealItem.amount).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.carbs * mealItem.amount).toFixed(2))}</TableCell>
            <TableCell align="right">{parseFloat((mealItem.protein * mealItem.amount).toFixed(2))}</TableCell>
        </TableRow>

    </>
    )
}

export default MealItem;
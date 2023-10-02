/*

TODO


*/

import React from "react";

//Components
import MealItem from "./MealItem";

//material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TableFooter from '@mui/material/TableFooter';
import Paper from "@mui/material/Paper";

import "../stylesheets/meal.css"


const Meal = (props) => {
    const dispatchBackdrop = props.dispatchBackdrop
    const totals = {
        calories : 0,
        carbs : 0,
        fat : 0,
        protein : 0
    }
    
    //This may be redundant at the moment
    props.meal.mealItems.map((mealItem, i) => {
        totals.calories += mealItem.calories * mealItem.amount
        totals.fat += mealItem.fat * mealItem.amount
        totals.carbs += mealItem.carbs * mealItem.amount
        totals.protein += mealItem.protein * mealItem.amount
    })


    const handleOpen = (loggedID) => {
        dispatchBackdrop({type: "CHANGEAMOUNT", loggedID : loggedID, dispatch : props.dispatch})
    }
    const handleOpenDelete = (loggedID) => {
        dispatchBackdrop({type: "DELETEITEM", loggedID : loggedID, dispatch : props.dispatch})
    }
    const handleOpenAdd = () => {
        dispatchBackdrop({type: "ADDITEM", dispatch : props.dispatch, meal : props.meal.meal})
    }
    

    return (
        <Paper className = "meal">
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: '200px'}} >{props.meal.name}</TableCell>
                            <TableCell align="right">Serving size</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.meal.mealItems.map((mealItem, i) => (
                        <MealItem 
                            key = {mealItem.loggedID} 
                            mealItem = {mealItem} 
                            handleOpen = {handleOpen} 
                            handleOpenDelete = {handleOpenDelete}/>
                    ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>Totals</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{parseFloat((totals.calories).toFixed(2))}</TableCell>
                            <TableCell align="right">{parseFloat((totals.fat).toFixed(2))}</TableCell>
                            <TableCell align="right">{parseFloat((totals.carbs).toFixed(2))}</TableCell>
                            <TableCell align="right">{parseFloat((totals.protein).toFixed(2))}</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">
                            <Button onClick = {handleOpenAdd}>Add Food</Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default Meal;
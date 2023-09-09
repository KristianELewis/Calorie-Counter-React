import React,{useState} from "react";

import Backdrop from '@mui/material/Backdrop';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

import "../stylesheets/addFoodItem.css"

import {addNewFoodItemConnect} from '../serverFunctions/serverFunctions.jsx'

//It would be better to have routing rather then using backdrops so much


const AddFoodItem = (props) => {

    const {open, setOpen, handleServerErrors} = props

    const [name, setName] = useState("");
    const [servingUnit, setServingUnit] = useState("g");
    const [servingSize, setServingSize] = useState(0);
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);

    const handleClose = () => {
        setOpen(false);
    }
 
    const acceptChange = () => {
        //update based on change
        addNewFoodItemConnect(name, servingSize, servingUnit, calories, carbs, fat, protein)
        .catch(error => handleServerErrors(error))
        handleClose();
    }

    return(
        <Backdrop open = {open}>
            <Card className = "addFoodItem">
                {/*propbaby can use labels or something*/}
                <h2>Add a food to the database</h2>
                <div className="addFoodItemFields">
                    <TextField 
                        label = "Name"
                        value = {name} 
                        margin="normal"
                        className = "AddFoodItemFieldsTextfield"
                        onChange = {(event) => setName(event.target.value)}
                    />
                  <TextField 
                        label = "Serving Size"
                        value = {servingSize}
                        type = "number"
                        margin="normal"
                        className = "AddFoodItemFieldsTextfield"
                        onChange = {(event) => setServingSize(event.target.value)} 
                    />
                    <TextField 
                        label = "Serving Unit"
                        value = {servingUnit}
                        margin="normal"
                        className = "AddFoodItemFieldsTextfield"
                        onChange = {(event) => setServingUnit(event.target.value)} 
                    />
                    <TextField 
                        label = "Calories"
                        value = {calories}
                        type = "number"
                        margin="normal"
                        className = "AddFoodItemFieldsTextfield"
                        onChange = {(event) => setCalories(event.target.value)} 
                    />
                    <TextField 
                        label = "Carbs"
                        value = {carbs} 
                        type = "number"
                        margin="normal"
                        className = "AddFoodItemFieldsTextfield"
                        onChange = {(event) => setCarbs(event.target.value)} 
                    />
                    <TextField 
                        label = "Fat"
                        value = {fat} 
                        type = "number"
                        margin="normal"
                        className = "AddFoodItemFieldsTextfield"
                        onChange = {(event) => setFat(event.target.value)} 
                    />
                    <TextField 
                        label = "Protein"
                        value = {protein} 
                        type = "number"
                        margin="normal"
                        className = "AddFoodItemFieldsTextfield"
                        onChange = {(event) => setProtein(event.target.value)} 
                    />
                </div>
                <div className = "addFoodItemButtons">
                    <Button onClick = {acceptChange} >Accept</Button>
                    <Button onClick = {handleClose} >Deny</Button>
                </div>
            </Card>
        </Backdrop>
        )

}

export default AddFoodItem;
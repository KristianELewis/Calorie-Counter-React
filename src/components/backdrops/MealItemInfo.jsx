import React, {useState} from "react"

import Backdrop from '@mui/material/Backdrop';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

import "../../stylesheets/changeAmountBackdrop.css"


const MealInfoDiv = (props) => {
    const name = props.name;
    const value = props.value;

    return(

        <div 
            className = "mealItemInfoSubDiv"
            style = {{
                display : "flex",
                justifyContent : "space-between"
            }}
        >
            <p style = {{marginTop : "5px", marginBottom : "5px"}}>{name}</p>
            <p style = {{marginTop : "5px", marginBottom : "5px"}}>{value}</p>
        </div>
    )

}

const MealItemInfo = (props) => {
    //just switch to destructuring, this is nonsense
    const name = props.mealItem.name;
    //const brand = "brandName"
    const servingSize = props.mealItem.servingSize;
    const servingSizeUnit = props.mealItem.servingUnit;
    const calories = props.mealItem.calories;
    const protein = props.mealItem.protein;
    const fat = props.mealItem.fat;
    const carbs = props.mealItem.carbs;
    const amount = props.mealItem.amount;
    const [amountChange, setAmountChange] = useState(amount)

    const handleAmountChange = (e) => {
        let newAmount = parseInt(e.target.value)
        if(newAmount > 0){
            setAmountChange(newAmount)
        }
    }
    const handleAccept = () => {
        if(amountChange !== amount)
        {
            props.acceptChange(amountChange)
        }
        props.deny()
    }
    const handleDelete = () => {
        props.acceptChangeDelete()
    }

    return(
        <Backdrop open = {true} >
            <Card 
                className = "changeAmountBackdrop" 
                sx = {{
                    width : "350px"
                }}
            >

                <div 
                    className = "upperMealItemInfo"
                    style = {{
                        textAlign: "left",
                        margin: "0"
                    }}
                >
                    {/* h2 here needs to wrap */}
                    <h2 style={{margin: "0"}}>{name}</h2>
                    {/*<p style={{margin: "0", fontSize: "12px"}}>{brand}</p>*/}
                </div>

                <hr></hr>
                
                <MealInfoDiv name = {"Serving Size"} value = {servingSize + " " + servingSizeUnit}/>
                <MealInfoDiv name = {"Calories"} value = {calories + " Kcal"}/>
                <MealInfoDiv name = {"Protein"} value = {protein + " g"}/>
                <MealInfoDiv name = {"Carbs"} value = {carbs + " g"}/>
                <MealInfoDiv name = {"Fat"} value = {fat + " g"}/>

                <div 
                    className = "mealItemInfoSubDiv"
                    style = {{
                        display : "flex",
                        justifyContent : "space-between"
                    }}
                >
                    <p>Amount</p>
                    <TextField 
                        size = "small" 
                        type = "number" 
                        value = {amountChange}
                        onChange ={handleAmountChange}
                        sx = {{
                            width : "75px"
                        }}
                    />
                </div>
                <div className= "changeAmountButtons">
                    <Button onClick = {handleDelete} color = "error">Delete</Button>
                    <Button onClick = {handleAccept}>Accept</Button>
                </div>
            </Card>
        </Backdrop>
        )
}
export default MealItemInfo
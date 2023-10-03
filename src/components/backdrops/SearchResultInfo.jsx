import React, {useState} from "react"
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

import "../../stylesheets/changeAmountBackdrop.css"

/*
    TODO
    
    -this can be more generic along with mealItemInfo
    -they are basically the same thing
    -it might come up again, maybe even addfooditem could have a similar structure

    the decimals need to be fixed in both



*/

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
    const name = props.searchResult.name;
    const brand = props.searchResult.brand;
    const servingSize = props.searchResult.servingSize;
    const servingSizeUnit = props.searchResult.servingUnit;
    const calories = props.searchResult.calories;
    const protein = props.searchResult.protein;
    const fat = props.searchResult.fat;
    const carbs = props.searchResult.carbs;
    const [amountChange, setAmountChange] = useState(0)

    const handleAmountChange = (e) => {
        let newAmount = parseInt(e.target.value)
        if(newAmount > 0){
            setAmountChange(newAmount)
        }
    }
    const handleAccept = () => {
        if(amountChange > 0)
        {
            props.handleAddMealItem(props.searchResult, amountChange)
        }
        handleCancel()
    }
    const handleCancel = () => {
        props.setDisplayIndividual({bool : false, searchResult : {}})
    }

    return(
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
                    <p style={{margin: "0", fontSize: "12px"}}>{brand}</p>
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
                    <Button onClick = {handleCancel} color = "error">Cancel</Button>
                    <Button onClick = {handleAccept}>Add</Button>
                </div>
            </Card>
        )
}
export default MealItemInfo
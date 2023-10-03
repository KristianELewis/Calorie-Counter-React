/*========================================================

TODO


-This should be renamed to BackDropController.jsx
-This needs to be completely refactored
-the backdrop reducer is potentially unecessary
-adding food item needs to be in its own route

========================================================*/

import React, {useState} from "react";
import {handleUpdate, handleDelete} from '../serverFunctions/serverFunctions.jsx'

//custom components
import SearchItemForm from "./backdrops/SearchItemForm";


//material UI
import Backdrop from '@mui/material/Backdrop';
import MealItemInfo from "./backdrops/MealItemInfo.jsx";


const BackdropBase = (props) => {

    const {backdropState, handleServerErrors} = props;

    //we can use a generic close
    const handleClose = () => {
        props.dispatchBackdrop({type : "CLOSEBACKDROP"});
    }
 
    //this is terrible
    const acceptChange = (amount) => {
        //update based on change
        handleUpdate(backdropState.loggedID, amount, props.userID, props.token, backdropState.dispatch)
        .catch(error => handleServerErrors(error))
        //probably only need to check for errors
        //maybe move dispatch back in here
        //.then(res => handleServerErrors(res))
        handleClose();
    }

    const acceptChangeDelete = () => {
        //deletes logged item
        handleDelete(backdropState.loggedID, props.userID, props.token, backdropState.dispatch)
        .catch(error => handleServerErrors(error))

        //.then(res => handleServerErrors(res))
        handleClose();
    }

    //needs to be replaced
    if (backdropState.choice === 2){
        //backdrop should just be inside the thing
        return(
        <Backdrop open = {backdropState.open}>
                <SearchItemForm 
                    userID = {props.userID} 
                    meal = {backdropState.meal} 
                    mealDispatch = {backdropState.dispatch} 
                    curDate = {props.curDate}
                    deny = {handleClose}
                    token = {props.token}
                    handleServerErrors = {handleServerErrors}
                    />
        </Backdrop>
        )
    }
    else if(backdropState.choice === 3){
        return( 
            <MealItemInfo
                mealItem = {backdropState.mealItem}
                acceptChange = {acceptChange}
                acceptChangeDelete = {acceptChangeDelete}
                deny = {handleClose}        
            />
        )
    }
    else if (backdropState.choice === -1){
        //feel like I should just not have this here at all
        return(
        <Backdrop open = {backdropState.open}>
        </Backdrop>
        )
    }
    else{
        //need to throw an error here/fail gracefully
        return (<h1>There is some issue with the backdrop</h1>)
    }
}

export default BackdropBase;
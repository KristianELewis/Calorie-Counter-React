import React from "react"

import Backdrop from '@mui/material/Backdrop';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

import "../../stylesheets/changeAmountBackdrop.css"

const ChangeAmount = (props) => {

    const {handleChange, acceptChange, changeAmount, deny, backdropState} = props;
    return(
        <Backdrop open = {backdropState.open}>
            <Card className = "changeAmountBackdrop">
                <h2>Change Amount</h2>
                <TextField onChange = {handleChange} type = "number" value = {changeAmount}></TextField>
                <div className= "changeAmountButtons">
                    <Button onClick = {acceptChange} >Accept</Button>
                    <Button onClick = {deny} >Deny</Button>
                </div>
            </Card>
        </Backdrop>
        )
}

export default ChangeAmount
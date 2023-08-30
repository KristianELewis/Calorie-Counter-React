import React from "react"

import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

import "../../stylesheets/deleteItemBackdrop.css"

const DeleteItem = (props) => {

    const {acceptChangeDelete, deny, backdropState} = props;
    return(
        <Backdrop open = {backdropState.open}>
            <Card className="deleteItemBackdrop">
                <p>Are you sure you want to delete this item?</p>
                <Button onClick = {acceptChangeDelete} >Accept</Button>
                <Button onClick = {deny} >Deny</Button>
            </Card>
        </Backdrop>
    )

}


export default DeleteItem
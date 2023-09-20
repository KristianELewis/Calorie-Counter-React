/*========================================================

TODO

-file state should be useRef
-currently does not reset picture state
    -picture choosing/uploading is error prone a the moment
-add abilty to change password

-could make sure no negative numbers could be given for age or weight? not super important at the moment, and these might get removed anyway

========================================================*/

import React, {useState} from "react";

import Backdrop from '@mui/material/Backdrop';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

import "../stylesheets/editUser.css"

import {handleUpdateUserInfo, uploadNewProfilePicture} from '../serverFunctions/serverFunctions'

const EditUser = (props) => {
    const {open, setOpen, userData, setUserData, setImgURL, handleServerErrors} = props;


    const [nameChange, setNameChange] = useState(userData.name);
    const [ageChange, setAgeChange] = useState(userData.age);
    const [weightChange, setWeightChange] = useState(userData.weight);

    //this should be a useRef
    const [file, setFile] = useState("none");

    const fileTestingChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleClose = () =>
    {
        setOpen(false);
    }

    //will resend data even if its the same, Maybe should change that
    //if there was an issue uploading both user data an profile picture, the user will only be informed about one of them, most likely profile picture
    //this is a low priority issue
    const acceptChange = () => {
        const newUserData = {...userData, name : nameChange, age : ageChange, weight : weightChange}
        handleUpdateUserInfo(newUserData, props.token)
        .then(res => {
            setUserData(newUserData)
        })
        .catch(error => handleServerErrors(error))

        //just to prevent a few uncessary server calls, if the user isnt changing the profile picture than there's no reason to upload it
        //actually dont think serverside checks if file is undefined, this might be necessary in order to not delete the user profile picture
        //anytime they want to change other data without uploading a new profile picture
        if(file != "none")
        {
            uploadNewProfilePicture(userData.userID, file, props.token)
            .then(res => {
                setImgURL(URL.createObjectURL(file))
                //setfile to none?
            })
            .catch(error => handleServerErrors(error))

        }
        handleClose();
    }

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setNameChange(newName);
    }

    const handleAgeChange = (event) => {
        const newAge = parseInt(event.target.value);
        setAgeChange(newAge);
    }

    const handleWeightChange = (event) => {
        const newWeight = parseInt(event.target.value);
        setWeightChange(newWeight);
    }

    return (
        <Backdrop open = {open}>
            <Card className = "editUser">
                {/*propbaby can use labels or something*/}
                <div className="editUserFields">
                    <TextField 
                        value = {nameChange} 
                        onChange = {handleNameChange} 
                        label = "Name"
                        InputProps={{
                            className: "editUserFieldsTextfield",
                        }}
                    />
                    <TextField 
                        value = {ageChange} 
                        onChange = {handleAgeChange} 
                        type = "number" 
                        label = "Age"
                        InputProps={{
                            className: "editUserFieldsTextfield",
                        }}
                    />
                    <TextField 
                        value = {weightChange} 
                        onChange = {handleWeightChange} 
                        type = "number" 
                        label = "Weight"
                        InputProps={{
                            className: "editUserFieldsTextfield",
                        }}
                    />
                    <label>Profile Picture</label>
                    <input 
                        type ="file" 
                        onChange= {fileTestingChange}
                    />
                </div>
                <div className="editUserButtons">
                    <Button onClick = {acceptChange} >Accept</Button>
                    <Button onClick = {handleClose} >Deny</Button>
                </div>
            </Card>
        </Backdrop>
    )
}

export default EditUser;
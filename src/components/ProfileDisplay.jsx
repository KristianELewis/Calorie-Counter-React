/*

TODO

----------------------------------------------------

functionality

-user should be able to hide details from their profile pages.
-need the ability to log out
----------------------------------------------------

style
- THE default profilepicture should be usernames first letter
----------------------------------------------------
*/

import React, {useEffect} from "react";


import "../stylesheets/profileDisplay.css"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import {getProfilePicture} from '../serverFunctions/serverFunctions'

const ProfileDisplay = (props) => {

    const {userData, setImgURL, imgURL, handleEditUser, handleLogout, handleServerErrors} = props;

    useEffect(() => {
        getProfilePicture(userData.userID, userData.profilePicture)
        .then(blob =>{
            setImgURL(URL.createObjectURL(blob))
        })
        .catch(error => {
            handleServerErrors(error)
        })
    }, [])

    return (
        <div className = "profileContainer">
            <div className = "topUserInfo">
                <Avatar alt="profilePic" src={imgURL}   sx={{ width: 125, height: 125 }}/>
                <div className = "userIdentity">
                    <h2>{userData.username}</h2>
                    <p>{userData.name}</p>
                </div>
            </div>

            <hr style = {{width: '100%'}}></hr>
            <div className = "bottomUserInfo">
                <p>Age: {userData.age}</p>
                <p>Weight: {userData.weight}</p>
            </div>
                <div className = "UserButtons">
                    <Button onClick = {handleLogout}>Logout</Button>
                    <Button onClick = {handleEditUser}>Edit Profile</Button>
                </div>

        </div>
    )
}
export default ProfileDisplay;
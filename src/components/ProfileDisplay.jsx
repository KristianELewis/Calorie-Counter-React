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

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import {getProfilePicture} from '../serverFunctions/serverFunctions'

import "../stylesheets/profileDisplay.css"

const ProfileDisplay = (props) => {

    const {userData, setImgURL, imgURL, handleEditUser, handleLogout, handleServerErrors} = props;

    useEffect(() => {
        getProfilePicture(userData.userID)
        .then(blob =>{
            setImgURL(URL.createObjectURL(blob))
        })
        .catch(error => {
            handleServerErrors(error)
        })
    }, [])


    /* this whole section is almost completely coppied directly from the material ui avatar documentation
    
    Maybe I'll change this, not exactly thrilled with the way it looks.

    Maybe Ill change it to have the first letter of the username instead of the whole username, not sure
    */
    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
            //added width and Height here
            width: 125,
            height: 125
          },
          //this had to change. It was written for exactly two word names
          //children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
          children: name,
        };
      }


    return (
        <div className = "profileContainer">
            <div className = "topUserInfo">
                <Avatar alt={userData.name} src={imgURL} {...stringAvatar(userData.username)}></Avatar>
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
/*
    TODO

    -login needs to work on enter
    -need error checking and to do nothing, if nothing is entered
    -decide If Card is really the right component to use here

*/

import Alert from '@mui/material/Alert';

import React, {useState} from "react";

import Card from '@mui/material/Card';
import { TextField, Button } from "@mui/material";


import { Backdrop } from '@mui/material';
import SignupPage from './SignupPage';

import '../stylesheets/loginPage.css'
const LoginPage = (props) => {

        const { alerted , setAlerted} = props;

        const [signup, setSignup] = useState(false);

        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")

        const handleUsernameChange = (event) => {
            setUsername(event.target.value)
        }
        const handlePasswordChange = (event) => {
            setPassword(event.target.value)
        }
        const handleLogin = () => {
            setAlerted({error: false, errorType:"none"});
            props.userLogin_(username, password)
        }

        const handleSignup = () => {
            setAlerted({error: false, errorType:"none"});
            setSignup(true);
        }
        
    return(
        <>
            {signup ?
                <SignupPage setSignup = {setSignup}/>
                :
                <Card className = "loginPage">
                <h3>Calorie Calculator</h3>
                <h3>Login</h3>
                <div className = "loginInputs">            
                    <TextField onChange = {handleUsernameChange} required id = "username" label="Username" size="small"/>
                    <TextField onChange = {handlePasswordChange} required id = "password" type="password" label="Password" size="small" sx = {{marginTop:2}}/>
                </div>
                {alerted.error ? <Alert onClose = {() => {setAlerted({error: false, errorType:"none"})}}severity="error">{alerted.errorType}</Alert> : <></>}
                <div className="loginButtons">
                    <Button onClick = {handleSignup}>Sign Up</Button>
                    <Button onClick = {handleLogin}>Login</Button>
                </div>
                </Card>
            }
        </>
    )
}

export default LoginPage;
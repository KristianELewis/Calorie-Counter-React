/*======================================================================

    TODO

    -signup needs to work on enter
    -needs more validation
        -nothing can contain spaces, it will break the program, especially with userID/username

======================================================================*/

import React, {useState} from "react";

import Card from '@mui/material/Card';
import { TextField, Button } from "@mui/material";
import Alert from '@mui/material/Alert';


import { signUp } from "../serverFunctions/serverFunctions";

import '../stylesheets/signup.css'


const SignupPage = (props) => {

        const [signupError, setSignupError] = useState({isError : false, errorType : "none"})
        const {setSignup} = props;

        const [signupComplete, setSignupComplete] = useState(false);
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")

        const [name, setName] = useState("");
        const [age, setAge] = useState(0);
        const [weight, setWeight] = useState(0);

        const handleUsernameChange = (event) => {
            setUsername(event.target.value)
        }
        const handlePasswordChange = (event) => {
            setPassword(event.target.value)
        }
        const handleNameChange = (event) => {
            setName(event.target.value)
        }
        const handleAgeChange = (event) => {
            setAge(event.target.value)
        }
        const handleWeightChange = (event) => {
            setWeight(event.target.value)
        }
        const handleCancel = () => {
            setSignup(false);
        }

        //not sure if there is a better way to user input vallidation
        //there is also serverside validation
        const userValidation = () => {
            if (username === ""){
                setSignupError({isError : true, errorType : "No username sent 1"})
                return true;
            }
            else if(password === ""){
                setSignupError({isError : true, errorType : "No password sent 1"})
                return true;
            }
            else if(name === ""){
                setSignupError({isError : true, errorType : "No name sent 1"})
                return true;
            }
            else if(age === 0){
                setSignupError({isError : true, errorType : "No age sent 1"})
                return true;
            }
            else if(weight === 0){
                setSignupError({isError : true, errorType : "No weight sent 1"})
                return true;
            }
            return false;
        }

        //if anything is not entered it should just fail
        const handleSignUp = () => {
            setSignupError({isError : false, errorType : "none"})
            if (userValidation() === true ) {
                return
            }

            const userData = {
                username: username,
                password: password,
                name: name,
                age: age,
                weight: weight
            }
            signUp(userData)
            .then(res => {
                if (res.error === true)
                {
                    setSignupError({isError : true, errorType : res.errorType})
                }
                else{
                    setSignupError({isError : false, errorType : "none"})
                    setSignupComplete(true);
                    //eventually this should just sign you in
                    setTimeout(() => setSignup(false), 1000)
                }
            })

        }

    return(
        <Card className = "signupPage">
            <h3>Calorie Calculator</h3>
            <h3>Signup</h3>
            <div className = "signupInputs">            
                <TextField 
                    onChange = {handleUsernameChange} 
                    required = {true}
                    id = "signupUsername" 
                    label="Username" 
                    size="small" 
                    margin = "normal"
                />
                <TextField 
                    onChange = {handlePasswordChange} 
                    required = {true}
                    id = "signupPassword" 
                    type="password" 
                    label="Password" 
                    size="small" 
                    margin = "normal"
                />
                <TextField 
                    onChange = {handleNameChange} 
                    required = {true}
                    id = "signupName" 
                    type="name" 
                    label="name" 
                    size="small" 
                    margin = "normal"
                />
                <TextField 
                    onChange = {handleAgeChange} 
                    required = {true}
                    id = "signupAge" 
                    type="age" 
                    label="age" 
                    size="small" 
                    margin = "normal"
                />
                <TextField 
                    onChange = {handleWeightChange} 
                    required ={true}
                    id = "signupWeight" 
                    type="weight" 
                    label="weight" 
                    size="small" 
                    margin = "normal"
                />
            </div>
            {signupError.isError ? <Alert onClose = {() => {setSignupError({isError : false, errorType : "none"})}} severity="error">{signupError.errorType}</Alert> : <></>}
            {signupComplete ? <Alert severity="success">Signup Successful</Alert> : 
            <div className="signupButtons">
                <Button onClick = {handleCancel}>Cancel</Button>
                <Button onClick = {handleSignUp}>Sign Up</Button>
            </div>}
        </Card>
    )
}

export default SignupPage;


//                <TextField onChange = {handlePasswordChange} required id = "password" type="password" label="Password" size="small" sx = {{marginTop:2}}/>
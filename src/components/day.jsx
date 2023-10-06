/*================================================================

TODO

-Change this to "MainPage"

-Add a Meals Component
    -On choosing a day, send data down to the Meals Component

-Add Reactive Functionality
    -350 is the smallest width allowed
        -from 450 to 350 just deccrease space

-Move "Add to Food Database"
    -perhaps on clicking add food "Add to Food Database" should be included in that backdrop



------------------------------------------------------------------

Overall


-server functions
    -all server functions should handle serverside errors
    -if token expires, then server functions should logout with some standard code (think this is done already)
    -login functions all need to be reviewed

-profile picture stuff should be switched to useRef

Eventually -more involved things-

-dark mode/ light mode switch
-error alerts could stack
-potentially add redux

-enter at the login page should just count as login

-login should handle empty username or password better. Currently says inccorect username or password
-update amount accepts "e" as an input, potentially all number inputs do

-changing profile picture should be looked over, its error prone. If you hit cancel while choosing files it will set the files chosen array to nothing
    ,but it does not set the file state to "none" which is used to check if a profile picture has been chosend for update
    if the user changes the profile picture, and then changes the profile pciture again but selects cancel it will cause problems
--------------------------------------------------------------------

-component/filenames ie. this file is named incorrectly, should at least be Day not day
-decide on how stucture imports from material ui

BUTTONS
-remove the uppercase buttons

MEALS

-change column span for add food
    -also change to "Add Food to Meal"
-under daily totals and user info, there should be a block of space dedicated to the day selector
-perhaps user info and daily info should be placed on top of each other 

-should toggle between data for singular meal item and the amount the user has logged
---------------------------------------------------------------------

Style
-buttons need to stand out more
-change amount and delete options need to be changed
-dark mode light mode switch
-css stuff should be condensed, do not need so many files
-deal with left over vite/react css files
-date picker looks a little wonky


MEAL REDUCER
-intial values for meal reducer are here temporarily, these should be removed
-meal states are four separate states to keep the states as flat as possible
    -it is messy and a different state management system should be considered
-loading the daily information does not need to be 3 separate functions
-calculating totals is being done in here and in the Meal.jsx, it is redundant and should be done in one place
-upon loading, there should be loading icons set for each meal
-----------------------------------------------------------------

================================================================*/
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';


import React, {useReducer, useState, useEffect} from "react";

//reducers
import reducer from "../reducers/mealReducer";
import backdropReducer from "../reducers/backdropReducer";

//components
import BackdropBase from "./BackdropBase"
import BasicDatePicker from "./BasicDatePicker";
import Meal from "./Meal";
import ProfileDisplay from './ProfileDisplay'
import TotalsChart from './TotalsChart'

import dayjs from 'dayjs';

//material ui
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';

//utility functions
import { loadDay } from "../serverFunctions/serverFunctions";
import {NotFoundError, AuthError, ServerSideError, UnknownError, NoProfilePicture} from '../serverFunctions/customErrors'
import {removeCookies} from '../serverFunctions/cookieUtilFunctions'
import '../stylesheets/day.css'

//initial meal reducer values
const breakfastinit = {name: "Breakfast", loaded : false, meal : 0, mealItems: []}
const lunchinit = {name: "Lunch", loaded : false, meal : 1, mealItems: []}
const dinnerinit = {name: "Dinner", loaded : false, meal : 2, mealItems: []}
const snackinit = {name: "Snack", loaded : false, meal : 3, mealItems: []}
const backdropinit = {open : false, choice : -1};


const Day = (props) => {    
    const { setUserID, setUserData, setIsLoggedIn, setAlerted } = props;

    //used in profileDisplau and edit user
    const [imgURL, setImgURL] = useState();

    //server error handling
    // dont like this
    const [errorAlert, setErrorAlert] = useState({error: false, errorType : "none"})

    //if there was an error contacting the server, this will be called
    //not sure if all these errors are necessary at the moment, this may be condensed or changed in the future
    //500 returns are unecessary
    //this should move maybe
    const handleServerErrors = (error) => {
        if (error instanceof AuthError)
        {
            handleLogout()
            //this is for login alerts
            setAlerted({error: true, errorType:"Session expired, please log back in"})
            return
        }
        else if(error instanceof NotFoundError)
        {
            setErrorAlert({error: true, errorType: error.message})
            return 
        }
        else if(error instanceof NoProfilePicture)
        {
            //This isn't actually an error
            //its probably not a good way of dealing with this
            return
        }
        else if(error instanceof ServerSideError)
        {
            setErrorAlert({error: true, errorType: error.message})
            return
        }
        else if(error instanceof UnknownError)
        {
            setErrorAlert({error: true, errorType: error.message})
            return
        }
        else{
            //this probably should never get reached
            setErrorAlert({error: true, errorType:"There was an issue processing your request 1"})
            return
        }
    }

    //date
    const [curDate, setCurDate] = useState(dayjs());

    //meal states
    const [breakfast, dispatchB] = useReducer(reducer, breakfastinit)
    const [lunch, dispatchL] = useReducer(reducer, lunchinit)
    const [dinner, dispatchD] = useReducer(reducer, dinnerinit)
    const [snack, dispatchS] = useReducer(reducer, snackinit)

    //logout
    const handleLogout = () => {
        setUserID("");
        setUserData({});
        setIsLoggedIn(false);
        removeCookies();
    }

    //++++++++++++++++++++++++++++++++++++++++
    const [backdropState, dispatchBackdrop] = useReducer(backdropReducer, backdropinit)
    //Stuff for the backdrop for adding new foodItems to the database.
    //It is separate from the other backdrop stuff
    const [openAdd, setOpenAdd] = useState(false)
    const handleAddFoodItem = () => {

        dispatchBackdrop({type: "ADDDATABASEITEM"})

        //setOpenAdd(true);
    }


    /*=======================================================================
    CHANGE USER DATA STUFF

    ========================================================================*/

    const handleEditUser = () => {
        dispatchBackdrop({type: "EDITUSER"})
    }
    const handleChangePassword = () => {
        dispatchBackdrop({type: "CHANGEPASSWORD"})
    }

    /*=======================================================================
        LOAD DAILY INFORMATION

        Every time I scroll past this I think about ending it all


        -change this to meal information
        -If I continue to use meals like this, the meal states should be saved in inside the meals themselves.
        -Their totals should also be calculated inside the meals themselves.
        -When a meal changes its totals should be passed up to the day, and then down into a daily totals component
        -right now they will all be rerendered when anyone of them change(the entirety of the day component will be rerendered)
    ========================================================================*/

    function intitializeMeals (list) {

        let bL = []
        let lL = []
        let dL = []
        let sL = []
    
        for (const element of list)
        {
            switch (element.meal){
                case 0:
                    bL.push(element)
                    break;
                case 1:
                    lL.push(element)
                    break;
                case 2:
                    dL.push(element)
                    break;
                case 3:
                    sL.push(element)
                    break;
            }
        }
        dispatchB({type : "LOAD", mealItems : bL})
        dispatchL({type : "LOAD", mealItems : lL})
        dispatchD({type : "LOAD", mealItems : dL})
        dispatchS({type : "LOAD", mealItems : sL})
        return
    }
    const handleLoad = () => {
        //should set the meals to loading icons each time it is called
        loadDay(props.userID,curDate,props.userData.token)
        .then(res => {
            intitializeMeals(res)
        })
        .catch(err => {handleServerErrors(err)})
    }
    useEffect(() => {handleLoad()}, [curDate])

    //This is for calculating the the totals for the chart
    //totals are also being calculated in each meal component, redudant
    //Jesus man
    const totals = {
        calories : 0,
        carbs : 0,
        fat : 0,
        protein : 0
    }    
    breakfast.mealItems.map((mealItem, i) => {
        totals.calories += mealItem.calories * mealItem.amount
        totals.fat += mealItem.fat * mealItem.amount
        totals.carbs += mealItem.carbs * mealItem.amount
        totals.protein += mealItem.protein * mealItem.amount
    })
    lunch.mealItems.map((mealItem, i) => {
        totals.calories += mealItem.calories * mealItem.amount
        totals.fat += mealItem.fat * mealItem.amount
        totals.carbs += mealItem.carbs * mealItem.amount
        totals.protein += mealItem.protein * mealItem.amount
    })
    dinner.mealItems.map((mealItem, i) => {
        totals.calories += mealItem.calories * mealItem.amount
        totals.fat += mealItem.fat * mealItem.amount
        totals.carbs += mealItem.carbs * mealItem.amount
        totals.protein += mealItem.protein * mealItem.amount
    })
    snack.mealItems.map((mealItem, i) => {
        totals.calories += mealItem.calories * mealItem.amount
        totals.fat += mealItem.fat * mealItem.amount
        totals.carbs += mealItem.carbs * mealItem.amount
        totals.protein += mealItem.protein * mealItem.amount
    })

    return (
        <>
            {/* This section could potentially be moved into a single component*/}
            {/* Adding posts and other social media content will completely change the stucture of this whole page*/}

            <Paper elevation={2} className = "upperContainer">
                <ProfileDisplay 
                    userData = {props.userData} 
                    imgURL = {imgURL} 
                    setImgURL = {setImgURL}
                    handleEditUser = {handleEditUser}
                    handleLogout = {handleLogout}
                    handleAddFoodItem = {handleAddFoodItem}
                    handleServerErrors = {handleServerErrors}
                    curDate = {curDate} 
                    setCurDate = {setCurDate}
                    handleChangePassword = {handleChangePassword}
                    />
                <div className = "rightSide">
                    <h2 style ={{marginBottom : "10px"}} >Daily Totals</h2>
                    <div className ="totalsDisplay">
                        <div className ="chartContainer">
                            <hr></hr>
                            <TotalsChart
                                carbs = {totals.carbs}
                                protein = {totals.protein}
                                fat = {totals.fat}
                            />
                            <hr></hr>

                        </div>
                        <div >
                            <Table size="small" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="right">{parseFloat((totals.calories).toFixed(2))}</TableCell>
                                        <TableCell align="right">{parseFloat((totals.fat).toFixed(2))}</TableCell>
                                        <TableCell align="right">{parseFloat((totals.carbs).toFixed(2))}</TableCell>
                                        <TableCell align="right">{parseFloat((totals.protein).toFixed(2))}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                    </div>
                </div>
            </Paper>            
            {errorAlert.error ? <Alert onClose = {() => {setErrorAlert({error: false, errorType : "none"})}} severity="error">{errorAlert.errorType}</Alert>: <></>}

            <hr></hr>

            <div>
                {breakfast.loaded ? 
                    <Meal 
                        meal = {breakfast}
                        dispatch = {dispatchB} 
                        dispatchBackdrop = {dispatchBackdrop}
                    /> : <p>loading</p>}
                {lunch.loaded ? 
                    <Meal 
                        meal = {lunch} 
                        dispatch = {dispatchL} 
                        dispatchBackdrop = {dispatchBackdrop}
                    /> : <p>loading</p>}
                {dinner.loaded ? 
                    <Meal 
                        meal = {dinner} 
                        dispatch = {dispatchD} 
                        dispatchBackdrop = {dispatchBackdrop}
                    /> : <p>loading</p>}
                {snack.loaded ? 
                    <Meal 
                        meal = {snack} 
                        dispatch = {dispatchS} 
                        dispatchBackdrop = {dispatchBackdrop}
                    /> : <p>loading</p>}
            </div>
            <hr></hr>

            {/* Backdrops */}

            {/*Edit profile and add food item will not be include in the backdrop base */}
            {/*They are too different from the other backdrops, and they would be better as their own pages when/if routing is added*/}
            <BackdropBase 
                backdropState = {backdropState} 
                dispatchBackdrop = {dispatchBackdrop}
                curDate = {curDate}
                userID = {props.userID}
                token = {props.userData.token}
                handleServerErrors = {handleServerErrors}
                userData = {props.userData} 
                setUserData = {props.setUserData} 
                imgUrl = {imgURL} 
                setImgURL ={setImgURL}
            />
        </>
    );
}
export default Day;
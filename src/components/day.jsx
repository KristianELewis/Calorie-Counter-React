/*================================================================

TODO

------------------------------------------------------------------

Overall


-server functions
    -all server functions should handle serverside errors
    -if token expires, then server functions should logout with some standard code (think this is done already)
    -login functions all need to be reviewed

-profile picture stuff should be switched to useRef

Eventually -more involved things-

-add posts and comments
-add friends
-get cognito authentication working
-routing?
    -add fooditem and edit user should not be backdrops
-dark mode/ light mode switch
-error alerts could stack
-potentially add redux
-clicking on individual food items should open up an expanded version that shows all of the nutritional information

Eventually -less involved things-
-enter at the login page should just count as login
-not allow quantites less than 1 in adding food items
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



import React, {useReducer, useState, useEffect} from "react";

//reducers
import reducer from "../reducers/mealReducer";
import backdropReducer from "../reducers/backdropReducer";

//components
import BackdropBase from "./BackdropBase"
import EditUser from "./EditUser"
import AddFoodItem from "./AddFoodItem"
import BasicDatePicker from "./BasicDatePicker";
import Meal from "./Meal";
import ProfileDisplay from './ProfileDisplay'
import TotalsChart from './TotalsChart'

import dayjs from 'dayjs';

//material ui
import { Paper, Button } from "@mui/material";
import Alert from '@mui/material/Alert';

//utility functions
import { loadDay } from "../serverFunctions/serverFunctions";
import {NotFoundError, AuthError, ServerSideError, UnknownError} from '../serverFunctions/customErrors'
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

    const handleServerErrors = (error) => {
    //if there was an error contacting the server, this will be called
    //not sure if all these errors are necessary at the moment, this may be condensed or changed in the future
    //500 returns are unecessary
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
            setErrorAlert({error: true, errorType:"There was an issue processing your request"})
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
        setOpenAdd(true);
    }


    /*=======================================================================
    CHANGE USER DATA STUFF

    this will just be its own backdrop for right now. I think I'd like this to be its own page when I introduce routing

    ========================================================================*/

    const [openEditUser, setOpenEditUser] = useState(false)
    const handleEditUser = () => {
        setOpenEditUser(true)
    }

    /*=======================================================================
        LOAD DAILY INFORMATION
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
                    handleServerErrors = {handleServerErrors}
                    />
                <div className = "rightSide">
                    <h2>Daily Totals</h2>
                    <div className ="totalsDisplay">
                        <div>
                            <p>Calories: {parseFloat((totals.calories).toFixed(2))}</p>
                            <p>Carbs: {parseFloat((totals.carbs).toFixed(2))}</p>
                            <p>Fat: {parseFloat((totals.fat).toFixed(2))}</p>
                            <p>Protein: {parseFloat((totals.protein).toFixed(2))}</p>

                        </div>
                        <div className ="chartContainer">
                            <TotalsChart
                                carbs = {totals.carbs}
                                protein = {totals.protein}
                                fat = {totals.fat}
                            />
                        </div>
                    </div>
                    <div className = "dateThing">
                        <BasicDatePicker curDate = {curDate} setCurDate = {setCurDate} />
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
                <Button onClick={handleAddFoodItem}>Add to Food Database</Button>
            </div>
            <hr></hr>

            {/* Backdrops */}

            {/*Edit profile and add food item will not be include in the backdrop base */}
            {/*They are too different from the other backdrops, and they would be better as their own pages when/if routing is added*/}
            <AddFoodItem
                open = {openAdd}
                setOpen = {setOpenAdd}
                handleServerErrors = {handleServerErrors}
            />
            <EditUser 
                open = {openEditUser} 
                setOpen = {setOpenEditUser} 
                userData = {props.userData} 
                setUserData = {props.setUserData} 
                imgUrl = {imgURL} 
                setImgURL ={setImgURL}
                token = {props.userData.token}
                handleServerErrors = {handleServerErrors}
                />

            <BackdropBase 
                backdropState = {backdropState} 
                dispatchBackdrop = {dispatchBackdrop}
                curDate = {curDate}
                userID = {props.userID}
                token = {props.userData.token}
                handleServerErrors = {handleServerErrors}
            />
        </>
    );

}
export default Day;
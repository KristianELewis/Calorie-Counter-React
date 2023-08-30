/*
LOCATIONS
~~~~~~~~~~~~~~~~~~~~~
Day.jsx -errors done
BackdropBase.jsx -errors done, maybe move dispatch
AddFoodItem.jsx -errors done
EditUser.jsx -error handling in use old
ProfileDisplay.jsx -errors done
SearchItemForm.jsx -errors done
SearchResults.jsx -errors done
App.jsx -has its own form of error handling old
SignUpPage.jsx -has its own form of error handling old
~~~~~~~~~~~~~~~~~~~~~~
Needs to completelty be redone for errors, just use responses

TODO

-these can be placed in separate files
-this file should probably just change to a js file

-needs to be https
-needs to reject http

-need to deal with remenants of old error handling
    -some things will still return a res.json() that used to hold the old error handling information

-userSignup and login are still using their own error handling
    -probably should modify to use the more generic error handling
______________________________________________________________________________________
/*====================================================================================

LOGGED ITEM FUNCTIONS

/*------------------------------------------------------------------------------------
DELETE LOGGED ITEM
used in BackdropBase.jsx
------------------------------------------------------------------------------------*/
import dayjs from 'dayjs';


import {NotFoundError, AuthError, ServerSideError, UnknownError} from './customErrors'
//should this be in the custom errors file instead?
async function serverErrorDecider(res){
    //all status codes should come with a message
    //just incase one doesnt, this will asign a generic one
    let errMessage = ""
    await res.json()
    .then(res => errMessage = res.message)
    .catch(err => {
        errMessage = "There was an issue processing your request"
    })

    if (res.status === 403)
    {
        throw new AuthError(errMessage)
    }
    else if(res.status === 404)
    {
        throw new NotFoundError(errMessage)
    }
    else if(res.status === 500)
    {
        throw new ServerSideError(errMessage)
    }
    else{
        throw new UnknownError(errMessage)

    }
}

export async function handleDelete (loggedID, userID, token, dispatch){

    const path = `http://localhost:3000/user/${userID}/logged-food/${loggedID}`

    return fetch(path, {
        method: "DELETE",
        body: JSON.stringify({
            loggedID : loggedID,
            userID : userID,
        }
        ),
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
        }
    })
    .then(res => {
        //will either return the data or an error
        if(!res.ok){
            return serverErrorDecider(res)
        }
        dispatch({type : "REMOVEITEM", loggedID : loggedID})
    })
}

/*------------------------------------------------------------------------------------
UPDATE LOGGED ITEM AMOUNT
function name should change
used in BackdropBase.jsx
------------------------------------------------------------------------------------*/

export async function handleUpdate (loggedID, amount, userID, token, dispatch) {

    const path = `http://localhost:3000/user/${userID}/logged-food/${loggedID}`

    return fetch(path, {
        method: "PATCH",
        body: JSON.stringify({
            amount : amount
        }
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
        }
        })
        .then(res => {
            //will either return the data or an error
            if(!res.ok){
                return serverErrorDecider(res)
            }
            dispatch({type : "CHANGEAMOUNT", loggedID : loggedID, amount : amount})
    })
}

/*------------------------------------------------------------------------------------
ADD LOGGED ITEM 
auth needed
used in ServerItemForm.jsx
------------------------------------------------------------------------------------*/
export async function addMealItemServerFunc (userID, meal, foodItemID, amount, curDate, token) {
    
    const date = dayjs(curDate).format('YYYY-MM-DD')
    const path = `http://localhost:3000/user/${userID}/date/${date}/new-item`

	return (
		fetch(path, {
		method: "POST",
		body: JSON.stringify({
			meal: meal, 
			foodItemID : foodItemID, 
			amount : amount
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
		}
		})
        .then(res => {
            //will either return the data or an error
            if(!res.ok){
                return serverErrorDecider(res)
            }
            return res.json()
        })
	)
}

/*------------------------------------------------------------------------------------
LOAD DAY
load meal information for a specific day
auth needed
used in Day.jsx
------------------------------------------------------------------------------------*/

export async function loadDay (userID, curDate, token) {
   
    const date = dayjs(curDate).format('YYYY-MM-DD')
    const path = `http://localhost:3000/user/${userID}/date/${date}`
  
    return (
        fetch(path, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + token
            }
        })
        .then(res => {
            //will either return the data or an error
            if(!res.ok){
                return serverErrorDecider(res)
            }
            return res.json()
        })
    )
  }

/*====================================================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*====================================================================================

FOOD ITEM DATABASE FUNCTIONS

/*------------------------------------------------------------------------------------
ADD NEW FOOD ITEM TO DATABASE
no auth needed
used in AddFoodItem.jsx
name should change, confused with AddMealItemServerFunc
------------------------------------------------------------------------------------*/

export async function addNewFoodItemConnect (name, calories, carbs, fat, protein) {
    
     return fetch("http://localhost:3000/database-food/new-item", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            calories: calories,
            carbs: carbs,
            fat : fat,
            protein: protein
        }
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        .then(res => {
            //will either return the data or an error
            if(!res.ok){
                return serverErrorDecider(res)
            }
            return res.json()
        })
}


/*------------------------------------------------------------------------------------
SEARCH FOOD ITEM DATA BASE
no auth needed
used in ServerItemForm.jsx
------------------------------------------------------------------------------------*/
export async function serverSearch (searchBoxText) {

    const path = `http://localhost:3000/database-food/${searchBoxText}`

    return (fetch(path, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res =>{             
        if(!res.ok){
            return serverErrorDecider(res)
        }
        return res.json()
    }))
}

/*------------------------------------------------------------------------------------
SECONDARY SEARCH
no auth needed
used in SearchResults.jsx
different the SearchResult poor naming, should change
------------------------------------------------------------------------------------*/
export async function changeResultsPage(searchQuery, page) {

    const startingPoint = 5 * (page - 1);
    const path = `http://localhost:3000/database-food/${searchQuery}/p${startingPoint}`

    return (fetch(path, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res =>{             
        if(!res.ok){
            return serverErrorDecider(res)
        }
        return res.json()
    })
)}


/*====================================================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*====================================================================================

USERDATA FUNCTIONS

/*------------------------------------------------------------------------------------
USER SIGNUP
no auth needed
used in SignUpPage.jsx
------------------------------------------------------------------------------------*/

export async function signUp (userData) {
    return (fetch("http://localhost:3000/signup", {
        method: "POST",
        body: JSON.stringify({
            userData : userData
        }
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json()))
}

/*------------------------------------------------------------------------------------
LOGIN
should make it so the token is stored in cookies instead
used in App.jsx
------------------------------------------------------------------------------------*/
export async function userLogin (username, password) {

	return (
		fetch("http://localhost:3000/login", {
		method: "POST",
		body: JSON.stringify({
			username: username,
			password: password 
		}),
			headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
	.then((res => res.json()))
	)
}

export async function tokenLoginS (userID, token) {
    return (
		fetch(`http://localhost:3000/login/token/${userID}`, {
		method: "POST",
			headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
		}
	})
	.then((res => res.json()))
	)
}

/*------------------------------------------------------------------------------------
GET PROFILE PICTURE
used in ProfileDisplay.jsx
------------------------------------------------------------------------------------*/

export async function getProfilePicture(userID, profilePicture){
    //unecessary use of userID.profilePicture
    //also limits the ability for this to be a generic function for getting user profile pictures
    //needs to be removed, just check if the user has uploaded a profile picture
    return fetch(`http://localhost:3000/user/${userID}/profile-picture/${profilePicture}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then(res => {
        //will either return the data or an error
        if(!res.ok){
            return serverErrorDecider(res)

        }
        return res.blob()
    })
}

/*------------------------------------------------------------------------------------
UPDATE USER DATA
used in EditUser.jsx
------------------------------------------------------------------------------------*/
export async function handleUpdateUserInfo (userData, token) {

    return fetch(`http://localhost:3000/user/${userData.userID}/user-info`, {
        method: "PATCH",
        body: JSON.stringify({
            userData : userData
        }
        ),
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
        }
    })
    .then(res =>{             
        if(!res.ok){
            return serverErrorDecider(res)
        }
        return res.json()
    })
}


/*------------------------------------------------------------------------------------
UPLOAD NEW PROFILE PICTURE
used in EditUser.jsx
------------------------------------------------------------------------------------*/
export async function uploadNewProfilePicture (userID, file, token) {

    let formData = new FormData();
    formData.append('file', file)

    return fetch(`http://localhost:3000/user/${userID}/upload-profile-picture`, {
        method: "PATCH",
        body : formData,
          headers: {
            "Authorization": "Bearer " + token
      }
    })
    .then(res =>{             
        if(!res.ok){
            return serverErrorDecider(res)
        }
        return res.json()
    })
}

/*====================================================================================*/
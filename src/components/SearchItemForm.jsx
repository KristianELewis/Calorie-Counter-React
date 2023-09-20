/*
TODO

-This should have its own route and not rely on backdrops
-it looks like there is a lot of redundant information in this file being passed around
-should look into this

 */


import React, {useState} from "react";

import { TextField, useThemeProps } from "@mui/material";
import Button from '@mui/material/Button';

import Card from "@mui/material/Card";

import "../stylesheets/searchItemBackdrop.css"

import {serverSearch, addMealItemServerFunc} from "../serverFunctions/serverFunctions";
import SearchResults from "./SearchResults";
import CircularProgress from '@mui/material/CircularProgress';

const SearchItemForm = (props) => {

    const {deny, handleServerErrors} = props;
    
    //may not be necessary
    const [hasSearched, setHasSearched] = useState(false)
    const [searchDone, setSearchDone] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [searchBoxText, setSearchBoxText] = useState("");

    const handleSearchBoxChange = (event) => {
        setSearchBoxText(event.target.value)
    }

    const handleSearch = () => {
        if(searchBoxText === "")
        {   //this should set an alert that says nothing has been searched
            //or maybe just set the search results to an empty list
            //console.log("empty");
        }
        else{
            setHasSearched(true);
            serverSearch(searchBoxText)
            .then(res => {
                setSearchResults(res);
                setSearchDone(true);
            })
            .catch(error => {
                handleServerErrors(error)
                deny();
            })
        }
    }

    //this probably could be done differently
    const handleAddMealItem = (result, amount) => {
        addMealItemServerFunc(props.userID, props.meal, result.foodItemID, amount, props.curDate, props.token)
        .then(res => {
            //could probably do destructing or something            

            const mealItem = {
                meal: props.meal, 
                amount : amount, 
                loggedID : res.loggedID, 
                servingSize : result.servingSize,
                servingUnit : result.servingUnit,
                calories : result.calories, 
                carbs : result.carbs, 
                fat : result.fat, 
                protein : result.protein, 
                name : result.name, 
                date : props.curDate
            }
            props.mealDispatch({type : "ADDITEM", mealItem : mealItem})

        })
        .catch(error => {
            handleServerErrors(error)
            deny();
        })
    }

    return (
        <Card className = "searchItemBackdrop">
            {!hasSearched ? 
                <>
                    <p>Search Here</p>
                    <TextField value = {searchBoxText} onChange = {handleSearchBoxChange} ></TextField>
                    <div className="searchItemButtons">
                        <Button onClick = {handleSearch}>Search</Button>
                        <Button onClick = {deny} >Deny</Button>
                    </div> 
                </>
            :
                searchDone ?
                    <SearchResults
                        searchQuery = {searchBoxText}
                        searchResults = {searchResults}
                        handleAddMealItem = {handleAddMealItem}
                        deny = {deny}
                        setSearchResults = {setSearchResults}
                        handleServerErrors = {handleServerErrors}
                        />
                    :
                    <CircularProgress />
            }
        </Card>
    )
}

export default SearchItemForm;
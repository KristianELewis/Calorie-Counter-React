import React from "react"

import Card from "@mui/material/Card"
import Button from "@mui/material/Button"

import "../stylesheets/infoPage.css"
const InfoPage = (props) => {



    return (
        <Card className ={"infoPage"}>
            <h2>Welcome</h2>
            <p>This is a calorie counting web app. The purpose of this website is to help me learn new skill and to showcase my abilities. Please do not use this website to keep track of your calories. There are much better websites with more features that will do this for free.</p>
            <p>The website is in early and active development. If you make an account, it's very likely to be deleted without warning!</p>
            <p>This webste uses two cookies to remember login info. One is your username, and the other is a token used to log you in. By using this website you accept the use and storage of these cookies on your device</p>
            <p>Thank you for checking out my website!</p>
            <Button onClick = {props.handleInfoPage}>Okay</Button>
        </Card>

    )
}


export default InfoPage
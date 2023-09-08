import React from "react"

import Card from "@mui/material/Card"
import Button from "@mui/material/Button"

import "../stylesheets/infoPage.css"
const InfoPage = (props) => {



    return (
        <Card className ={"infoPage"}>
            <h2>Welcome!</h2>
            <p>This website is in early and active development. If you make an account, it's very likely to be deleted without warning!</p>
            <p>This webste uses two cookies to remember login info. By using this website you accept the use and storage of these cookies on your device</p>
            <Button onClick = {props.handleInfoPage}>Okay</Button>
        </Card>

    )
}


export default InfoPage
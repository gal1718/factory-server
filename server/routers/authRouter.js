const express = require('express')
const UsersBLL = require('../BLL/usersBLL')
const jwt = require('jsonwebtoken');
//import { ACCESS_SECRET_TOKEN } from '../constans'

const ACCESS_SECRET_TOKEN = "1234"


const router = express.Router();

//ENTRY POINT:  http://localhost:8888/auth

router.route('/login').post(async (req, res) => {
    const users = await UsersBLL.getAllUsersFromWS();
    const { username, email } = req.body;
    console.log(req.body);

    const user = users.find((user) => user.username == username && user.email == email);

    //User exists - create token
    if (user) {
        console.log("auth router exist in WS")
        const userExternalId = user.id;//uses as the ID - payload 


        const accessToken = jwt.sign(
            { id: userExternalId },
            ACCESS_SECRET_TOKEN,
            { expiresIn: 7200 } // 2hrs
        )
        
        res.json({ accessToken });
    }
    else {
       // console.log("auth rouert not exist in WS")
        res.json("User not found")
    }


})



module.exports = router
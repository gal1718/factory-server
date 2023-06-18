const express = require('express')
const UsersBLL = require('../BLL/usersBLL')
const jwt = require('jsonwebtoken');
//import { ACCESS_SECRET_TOKEN } from '../constans'

const ACCESS_SECRET_TOKEN = "1234"


const router = express.Router();
console.log("authrouter");

//ENTRY POINT:  http://localhost:8888/auth

router.route('/verify').get((req,res)=>{
    console.log("authrouter empty verfiy get called");

})



router.route('/login').post(async (req, res) => {
    console.log("11111")
    const {data: users} = await UsersBLL.getAllUsersFromWS();
    console.log("users 2222 " + users);
    const { username, email } = req.body;
    console.log("reqBody" + req.body);

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
        
        res.json({ accessToken,user });
    }
    else {
       // console.log("auth rouert not exist in WS")
        res.json("User not found")
    }
})

//get All employess
router.route('/').get(async (req, res) => {
    
    
    const users = await UsersBLL.getAllUsersfromDB();
    // console.log(shifts)
    res.json(users);

});



module.exports = router
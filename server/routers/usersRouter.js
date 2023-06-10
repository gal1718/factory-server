const express = require('express')
const UsersBLL = require('../BLL/usersBLL')
const jwt = require('jsonwebtoken');
//const {ACCESS_SECRET_TOKEN2} = require('../constans')
// const { ACCESS_SECRET_TOKEN2 } = require ('../constans/');

// console.log("ACCESS_SECRET_TOKEN" + ACCESS_SECRET_TOKEN2);
const router = express.Router();
const ACCESS_SECRET_TOKEN = "1234"

//Entry Point: //http://localhost:8888/user

router.route('/').get(async (req, res) => {
    const token = req.headers['x-access-token']

    if (!token) {
        
        res.status(401).json("No Token Provided");
    }
    else {
        

        jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
            if (err) {
                console.log("usersRouter: not verifed err token: " + token);

                res.status(500).json('Failed to authenticate token')
            }
            else {
              
               console.log("usersRouter else (verifed) token: " + token + "verify data: " + JSON.stringify(data));

                const user = await UsersBLL.getUser(data.id);
                console.log("user " + user);
                res.json(user);

            }


        })
    }

})

module.exports = router
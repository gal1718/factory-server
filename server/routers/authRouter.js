const express = require('express');
const UsersBLL = require('../BLL/usersBLL');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET_TOKEN = "1234";

const router = express.Router();



router.route('/verify').get((req, res) => {
    try {
        console.log("authrouter empty verify get called");
        // Add your verification logic here
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.route('/login').post(async (req, res) => { // Login send post request . assigning to JWT (in server)//returns the access token and the user's data 
    try {
        const { data: users } = await UsersBLL.getAllUsersFromWS();//why await? 
        const { username, email } = req.body;


        let user = users.find((user) => user.username == username && user.email == email);

        if (user) {
            const userFromDB = await UsersBLL.getUser(user.id);

            user = {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                numOfActions: userFromDB.numOfActions,
                _id: userFromDB._id,
                fullName: userFromDB.fullName,
                externalId: userFromDB.externalId
            }
            const userExternalId = user.id;

            const accessToken = jwt.sign(
                { id: userExternalId },
                ACCESS_SECRET_TOKEN,
                { expiresIn: 7200 } // 2hrs
            );

            res.json({ accessToken, user });
        } else {
            res.json("User not found");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.route('/').get(async (req, res) => {
    try {
        const users = await UsersBLL.getAllUsersfromDB();
        res.json(users);
    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.route('/getActions/:externalId').get(async (req, res) => {
    try {
        const { externalId } = req.params;
        const userActions = await UsersBLL.getUsersActionsfromDB(externalId);
        if (userActions)
            res.json(userActions);
        else
            res.json("No actions");
    } catch (error) {
        console.error("Error getting user actions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});















router.route('/createActions').post(async (req, res) => {
    try {
        const actions = req.body;
        const result = await UsersBLL.addActions(actions);
        res.json(result);
    } catch (error) {
        console.error("Error creating user actions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
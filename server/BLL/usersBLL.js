const usersWS = require('../DAL/usersWS');
const User = require('../model/userModel');
const Action = require('../model/actionModel');
const mongoose = require('mongoose');

const getAllUsersFromWS = async () => {
    try {
        return usersWS.getAllUsers(); 
    } catch (error) {
        console.error("Error getting all users from WS:", error);
        throw error;
    }
};


const getAllUsersfromDB = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.error("Error getting all users from DB:", error);
        throw error;
    }
};



const getUsersActionsfromDB = async (id) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const data = await Action.find({ externalId: id, date: { $gte: today } });

        return data;
    } catch (error) {
        console.error("Error getting user actions from DB:", error);
        throw error;
    }
};

const addActions = async (actions) => {
    try {

        const newActions = actions.filter((action) => !action._id);//removing existing records

        if (newActions.length > 0) {
            const insertedActions = await Action.insertMany(newActions);
            return "Actions created";
        } else {
            return "No New Actions";
        }
    } catch (error) {
        console.error("Error adding actions:", error);
        throw error;
    }
};



const getUser = async (externalId) => {
    try {
        const users = await getAllUsersfromDB();
        const user = users.find((user) => user.externalId === externalId);
        return user;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
};

module.exports = {
    getAllUsersFromWS,
    getAllUsersfromDB,
    getUser,
    getUsersActionsfromDB,
    addActions
};
const usersWS = require('../DAL/usersWS');
const User = require('../model/userModel')


const getAllUsersFromWS = async () => {
    const { data: users } = await usersWS.getAllUsers();
    return users;

};

const getAllUsersfromDB = async () => {
    return await User.find();
}


const getUser = async (externalId) => {
    const users = await getAllUsersfromDB();
    const user = users.find((user) => user.externalId === externalId)
    return user;
}



module.exports = { getAllUsersFromWS, getAllUsersfromDB, getUser };

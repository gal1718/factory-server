const axios = require('axios');
//import {usersUrl} from '../constans'

const usersUrl = "https://jsonplaceholder.typicode.com/users"
const getAllUsers = () => axios.get(usersUrl);



module.exports = {getAllUsers}
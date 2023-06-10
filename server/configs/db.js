const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/factory').then(() =>
        console.log("connected successfully to DB - factory")).catch(err => console.log(err))
}

module.exports = connectDB;

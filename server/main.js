const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./configs/db')
const jwt = require('jsonwebtoken');
const ACCESS_SECRET_TOKEN = "1234"


const authRouter = require('./routers/authRouter')
const EmployeesRouter = require('./routers/employeeRouter');// importing cars router to use it in app.use()
const DepartmentsRouter = require('./routers/departmentsRouter')
const ShiftsRouter = require('./routers/shiftsRouter')


const app = express();//open new express instance
const port = '8888'

//connect to DB
connectDB();

//Middlewares
app.use(cors());


    app.use(function (req, res, next) {
        // Put some preprocessing here.
        // console.log("request: " + req)

        const token = req.headers['x-access-token']
        console.log("token " + token)

        if (req.url === '/auth/login') {
            console.log("req.url === '/auth/login")
            return next()
        }
        if (!token) {

            console.log("no token")
            return res.status(401).json("No Token Provided");

        }
        else {

            jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
                console.log("main jwt verifing")
                if (err) {
                    console.log("not verifed err token: " + token);

                    return res.status(500).json('Failed to authenticate token')
                }
            })

        }

        return next();

    });



app.use('/', express.json());

//routers
app.use('/', authRouter)
app.use('/auth', authRouter)
app.use('/employees', EmployeesRouter);//direct to relevant router. request / - the entry point. cars - the rest of the req - for this type of req direct to cars router 
app.use('/departments', DepartmentsRouter);
app.use('/shifts', ShiftsRouter);



app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)

})




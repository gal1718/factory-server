const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./configs/db')


const authRouter = require('./routers/authRouter')
const usersRouter = require('./routers/usersRouter')
const EmployeesRouter = require('./routers/employeeRouter');// importing cars router to use it in app.use()
const DepartmentsRouter = require('./routers/departmentsRouter')
const ShiftsRouter = require('./routers/shiftsRouter')


const app = express();//open new express instance
const port = '8888'

//connect to DB
connectDB();

//Middlewares
app.use(cors());
app.use('/', express.json());

//routers
app.use('/auth', authRouter)
app.use('/user', usersRouter)
app.use('/employees', EmployeesRouter);//direct to relevant router. request / - the entry point. cars - the rest of the req - for this type of req direct to cars router 
app.use('/departments', DepartmentsRouter);
app.use('/shifts', ShiftsRouter);



app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
    
})




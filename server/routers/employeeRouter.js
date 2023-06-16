const express = require('express');
const employeeBLL = require('../BLL/employeeBLL')
const router = express.Router(); //routerclass. express.router create new router instance. this class contain all rest type requests

//http://localhost:${port}/employees - entry point


//get All employess
router.route('/').get(async (req, res) => {
  
        const employees = await employeeBLL.getAllEmployees();
        //console.log(employees)
        res.json(employees);  
        
});

//GetEmployeeById
router.route('/:id').get(async (req,res) => {
    const {id} = req.params;
   // console.log(id)
    const employee = await employeeBLL.getEmployeeById(id);
    res.json(employee ?? 'Wrong ID');    
})


//update an employee
router.route('/:id').put((req,res) => {
    const {id} = req.params;
    const updatedEmp = req.body;
    console.log("updatedEmp " + updatedEmp + " id: " + id );
    const newEmployees = employeeBLL.updateEmployee(id,updatedEmp);
    res.json(newEmployees);
    
})


// update many employees
router.put('/', (req, res) => {
        
        console.log("reached tro router")
        const employees = req.body;
        console.log("emp to update from request: " + JSON.stringify(employees))
        const data = employeeBLL.updateManyEmployees(employees)
        console.log("data is: " + data)
        res.json(data);
    
  });


//delete
router.route('/:id').delete(async (req,res) =>{
    const {id} = req.params;
    const newEmployees = await employeeBLL.deleteEmployee(id);
    res.json(newEmployees)
})

//Add an employee
router.route('/').post( async (req,res) =>{
    const newEmp = req.body;
    const result = await employeeBLL.addEmployee(newEmp);
    res.json(result);
  
})

module.exports = router;


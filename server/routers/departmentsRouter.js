const express = require('express');
const DepartmentBLL = require('../BLL/departmentsBLL')
const router = express.Router(); //routerclass. express.router create new router instance. this class contain all rest type requests

//http://localhost:${port}/employees - entry point



//get All Departments
router.route('/').get(async (req, res) => {
 
        let departments = await DepartmentBLL.getAllDepartments();
        //  departments = departments.map((department) => {

        //     return {...department, manager: }
        //  })
        //console.log("departments " + departments)
        res.json(departments);
    
});


//GetDepartmentById
router.route('/:id').get(async (req,res) => {
    try{
        const {id} = req.params;

   // console.log(id)
    const department = await DepartmentBLL.getDepartmentById(id);
    console.log("ddddddd " + department)
    res.json(department ?? 'Wrong ID');
    }

    catch(err){
        console.log(err)
        
    }
    
})


//update 
router.route('/:id').put((req,res) => {
    const {id} = req.params;
    const updatedDep = req.body;
    const newDepartment = DepartmentBLL.updateDepartment(id,updatedDep);
    res.json(newDepartment);
    
})





module.exports = router;


const express = require('express');
const employeeBLL = require('../BLL/employeeBLL');
const router = express.Router();



// Get All employees
router.route('/').get(async (req, res) => {
        const employees = await employeeBLL.getAllEmployees();
        const modifiedEmployees = employees.map((employee) => {
            if (!employee.department) {
                return { ...employee.toObject(), department: '' };
            }
            return employee;
        });
        //console.log("new employees " + JSON.stringify(employees));
        res.json(modifiedEmployees);
    
});


// Get Employee By Id
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeBLL.getEmployeeById(id);
        res.json(employee ?? 'Wrong ID');
    } catch (error) {
        console.error("Error getting employee by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Update an employee
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEmp = req.body;
        const newEmployees = await employeeBLL.updateEmployee(id, updatedEmp);
        res.json(newEmployees);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Update many employees
router.put('/', async (req, res) => {
    try {
        console.log("reached router");
        const employees = req.body;
        console.log("emp to update from request: " + JSON.stringify(employees));
        const newEmployees = employees.map((emp) => {
            if (emp.department == null || !emp.department) {
                emp.department = '';
            }
            return emp;
        });
        const data = await employeeBLL.updateManyEmployees(newEmployees);
        res.json(data);
    } catch (error) {
        console.error("Error updating multiple employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Delete an employee
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const newEmployees = await employeeBLL.deleteEmployee(id);
        res.json(newEmployees);
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Add an employee
router.route('/').post(async (req, res) => {
    try {
        const newEmp = req.body;
        const result = await employeeBLL.addEmployee(newEmp);
        res.json(result);
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
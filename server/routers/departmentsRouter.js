const express = require('express');
const DepartmentBLL = require('../BLL/departmentsBLL');
const router = express.Router();


// Get All Departments
router.route('/').get(async (req, res) => {
    try {
        const departments = await DepartmentBLL.getAllDepartments();
        res.json(departments);
    } catch (error) {
        console.error("Error getting departments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Get Department By Id
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const department = await DepartmentBLL.getDepartmentById(id);
        res.json(department ?? 'Wrong ID');
    } catch (error) {
        console.error("Error getting department by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Update Department
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDep = req.body;
        const newDepartment = await DepartmentBLL.updateDepartment(id, updatedDep);
        res.json(newDepartment);
    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Add a Department
router.route('/').post(async (req, res) => {
    try {
        const newDep = req.body;
        const result = await DepartmentBLL.addDepartmernt(newDep);
        res.json(result);
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Delete department
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const newDepartments = await DepartmentBLL.deleteDepartment(id);//change the client accordi insted of calling the get all again use that responmse
        res.json(newDepartments);
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
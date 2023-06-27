const Employee = require('../model/employeeModel');
const Department = require('../model/departmentModel');
const mongoose = require('mongoose');



async function getAllEmployees() {
    try {
        return await Employee.find().populate('department').populate('shifts').exec();
    } catch (error) {
        console.error("Error getting all employees:", error);
        throw error;
    }
}



const getEmployeeById = async (id) => {
    try {
        return await Employee.find({ _id: id }).populate('department').populate('shifts').exec();
    } catch (error) {
        console.error("Error getting employee by ID:", error);
        throw error;
    }
};



const updateEmployee = async (id, updatedEmp) => {
    try {
        const { modifiedCount } = await Employee.updateOne({ _id: id }, updatedEmp);// modifiedCount indicates how many documents matched the specified filter criteria and were successfully updated with the provided update data.
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};



const updateManyEmployees = async (updateEmployees) => {
    try {

        const updatePromises = updateEmployees.map(async (emp) => {
            if (emp.department === "") {
                emp.department = null;
            }
            return Employee.updateOne({ _id: emp._id }, emp);
        });

        await Promise.all(updatePromises);

        return getAllEmployees();
    } catch (error) {
        console.error("Error updating many employees:", error);
        throw error;
    }
};



const deleteEmployee = async (id) => {
    try {
        const departments = await Department.find({ manager: id });//delete employee from departments manager field ( if exist )

        await Promise.all(
            departments.map(async (department) => {
                await Department.findByIdAndUpdate(
                    department._id,
                    { $unset: { manager: "" } }
                );
            })
        );

        const employee = await Employee.findOneAndDelete({ _id: id });

        if (!employee) {
            return "Employee not found";
        }

        return employee;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};



const addEmployee = async (newEmp) => {
    try {
        const id = new mongoose.Types.ObjectId();
        const newEmpWithId = { ...newEmp, _id: id };

        const newEmployee = new Employee(newEmpWithId);
        await newEmployee.save();
        return "Employee created";
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
};



module.exports = {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    addEmployee,
    updateManyEmployees
};
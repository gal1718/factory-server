const Employee = require('../model/employeeModel');
const Department = require('../model/departmentModel');
const mongoose = require('mongoose');
const employeeModel = require('../model/employeeModel');


async function getAllEmployees() {
    return await Employee.find().populate('department').populate('shifts').exec();

};

//GetByID
const getEmployeeById = (id) => {
    return Employee.find({ _id: id }).populate('department').populate('shifts').exec();;

}



const updateEmployee = async (id, updatedEmp) => {
    const { modifiedCount } = await Employee.updateOne({ _id: id }, updatedEmp);
    console.log(modifiedCount);
}




const updateManyEmployees = async (updateEmployees) => {
    console.log("updateEmployees: " + JSON.stringify(updateEmployees));


    const updatePromises = updateEmployees.map(async (emp) => {
        if (emp.department === "") {
            emp.department = null;
        }
        return Employee.updateOne({ _id: emp._id }, emp);
    });

    await Promise.all(updatePromises);

    return getAllEmployees();

}




const deleteEmployee = async (id) => {
    // return Employee.findOneAndDelete({ _id: id })

    //need to delete also managers in departmetns
    try {


        const departments = await Department.find({ manager: id });

        // Delete the manager reference in each department
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
        console.error(error);
        return "Error deleting employee";
    }


}


//Post - Create
const addEmployee = async (newEmp) => {
    console.log("obj : " + JSON.stringify(newEmp) + " END");

    var id = new mongoose.Types.ObjectId();
    const newEmpWithId = { ...newEmp, _id: id }

    const newEmployee = new Employee(newEmpWithId);
    await newEmployee.save();
    return "Employee created";


}



module.exports = { getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, addEmployee, updateManyEmployees }
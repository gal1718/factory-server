const Employee = require('../model/employeeModel');
const mongoose = require('mongoose');


async function getAllEmployees() {
    return await Employee.find().populate('department').populate('shifts').exec();

};

//GetByID
const getEmployeeById =  (id) => {
    return  Employee.find({ _id: id }).populate('department').populate('shifts').exec();;
    
}



const updateEmployee = async (id, updatedEmp) => {
    const { modifiedCount } = await Employee.updateOne({ _id: id }, updatedEmp);
   // console.log(modifiedCount);
}

const deleteEmployee = (id) => {
    return Employee.findOneAndDelete({ _id: id })
}


//Post - Create
const addEmployee = async (newEmp) => {
    //console.log("obj : " + obj);
    var id = new mongoose.Types.ObjectId();
    const newEmpWithId = {...newEmp, _id: id}
    const newEmployee = new Employee(newEmpWithId);
    await newEmployee.save();
    return "Employee created";

}



module.exports = { getAllEmployees,getEmployeeById, updateEmployee, deleteEmployee, addEmployee }
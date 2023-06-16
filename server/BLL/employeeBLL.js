const Employee = require('../model/employeeModel');
const mongoose = require('mongoose');


async function getAllEmployees() {
    return await Employee.find().populate('department').populate('shifts').exec();

};

//GetByID
const getEmployeeById = (id) => {
    return Employee.find({ _id: id }).populate('department').populate('shifts').exec();;

}



const updateEmployee = async (id, updatedEmp) => {
    const { modifiedCount } = await Employee.updateOne({ _id: id }, updatedEmp);
    // console.log(modifiedCount);
}



const updateManyEmployees = (updateEmployees) =>{
    console.log("updateEmployees: " + updateEmployees);
    updateEmployees.map( async (emp) =>{
       // updateEmployee(emp._id,emp)
        const { modifiedCount } = await Employee.updateOne({ _id: emp._id }, emp);
    })
    return modifiedCount;

    // const updateData = updateEmployees.map(({ _id, ...updateFields }) => ({
    //     updateOne: {
    //       filter: { _id: _id },
    //       update: updateFields,
    //     },
    //   }));
  
    //   await Employee.bulkWrite(updateData);
  
      //res.json({ message: 'Employees updated successfully' });

} 

const deleteEmployee = (id) => {
    return Employee.findOneAndDelete({ _id: id })
}


//Post - Create
const addEmployee = async (newEmp) => {
    console.log("obj : " + newEmp);
    var id = new mongoose.Types.ObjectId();
    const newEmpWithId = { ...newEmp, _id: id }
    const newEmployee = new Employee(newEmpWithId);
    await newEmployee.save();
    return "Employee created";

}



module.exports = { getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, addEmployee, updateManyEmployees }
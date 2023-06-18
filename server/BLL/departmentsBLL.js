const Department = require('../model/departmentModel');
const mongoose = require('mongoose');


function getAllDepartments() {
    return Department.find().populate('manager').exec();
 
};

//GetByID
const getDepartmentById =  (id) => {
    return  Department.find({ _id: id }).populate('manager').exec();;
    
}

const updateDepartment = async (id, updatedDep) => {
    const { modifiedCount } = await Department.updateOne({ _id: id }, updatedDep);
   // console.log(modifiedCount);
}

//Post - Create
const addDepartmernt = async (newDep) => {
    console.log("obj : " + JSON.stringify(newDep) + " END");

    var id = new mongoose.Types.ObjectId();
    const newDepWithId = { ...newDep, _id: id }

    const newDepartment = new Department(newDepWithId);
    await newDepartment.save();
    return "Department created";


}


module.exports = {getAllDepartments, getDepartmentById, updateDepartment, addDepartmernt}
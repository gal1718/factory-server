const Department = require('../model/departmentModel');
const mongoose = require('mongoose');



function getAllDepartments() {
    try {
        return Department.find().populate('manager').exec();
    } catch (error) {
        console.error("Error getting all departments:", error);
        throw error;
    }
}


const getDepartmentById = async (id) => {
    try {
        return Department.find({ _id: id }).populate('manager').exec();
    } catch (error) {
        console.error("Error getting department by ID:", error);
        throw error;
    }
};


const updateDepartment = async (id, updatedDep) => {
    try {
        const { modifiedCount } = await Department.updateOne({ _id: id }, updatedDep);
        // console.log(modifiedCount);
    } catch (error) {
        console.error("Error updating department:", error);
        throw error;
    }
};



const addDepartmernt = async (newDep) => {
    try {
        console.log("obj: " + JSON.stringify(newDep) + " END");

        const id = new mongoose.Types.ObjectId();
        const newDepWithId = { ...newDep, _id: id };

        const newDepartment = new Department(newDepWithId);
        await newDepartment.save();

        return "Department created";
    } catch (error) {
        console.error("Error adding department:", error);
        throw error;
    }
};
const deleteDepartment = async (id) => {
    try {
        const department = await Department.findOneAndDelete({ _id: id });
        if (!department) {
            return "Employee not found";
        }
        return department;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};
module.exports = {
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    addDepartmernt,
    deleteDepartment
};
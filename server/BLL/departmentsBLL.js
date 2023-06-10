const Department = require('../model/departmentModel');


function getAllDepartments() {
    return Department.find().populate('manager').populate('employees').exec();
 
};

//GetByID
const getDepartmentById =  (id) => {
    return  Department.find({ _id: id }).populate('manager').populate('employees').exec();;
    
}

const updateDepartment = async (id, updatedDep) => {
    const { modifiedCount } = await Department.updateOne({ _id: id }, updatedDep);
   // console.log(modifiedCount);
}


module.exports = {getAllDepartments, getDepartmentById, updateDepartment}
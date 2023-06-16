const Department = require('../model/departmentModel');


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


module.exports = {getAllDepartments, getDepartmentById, updateDepartment}
const mongoose = require('mongoose')
const { Schema } = mongoose;
//const Employee = require('./employeeModel')

const departmentSchema = mongoose.Schema(
    {
        _id: Schema.Types.ObjectId,
        manager: { 
            type: Schema.Types.ObjectId, 
            ref: "employee",
            required: true
        
        },
        name: String
       
        
    }
)

module.exports = mongoose.model('department',departmentSchema, 'departments');
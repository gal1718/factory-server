const mongoose = require('mongoose')
const { Schema } = mongoose;

const employeeSchema = mongoose.Schema(
    {
        _id: Schema.Types.ObjectId,
        department: { type: Schema.Types.ObjectId, ref: 'department', default: null},
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        shifts: [{ type: Schema.Types.ObjectId, ref: 'shift'}],
    }
)

module.exports = mongoose.model('employee',employeeSchema, 'employees');
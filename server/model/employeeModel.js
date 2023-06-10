const mongoose = require('mongoose')
const { Schema } = mongoose;

const employeeSchema = mongoose.Schema(
    {
        _id: Schema.Types.ObjectId,
        department: { type: Schema.Types.ObjectId, ref: 'department' },
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        shifts: [{ type: Schema.Types.ObjectId, ref: 'shift'}],
    }
)

module.exports = mongoose.model('employee',employeeSchema, 'employees');
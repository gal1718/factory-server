const mongoose = require('mongoose')
const { Schema } = mongoose;

const shiftSchema = mongoose.Schema(
    {
        _id: Schema.Types.ObjectId,
        date: Date,
        startingHr: Number,
        endingHr: Number,
        
    }
)

module.exports = mongoose.model('shift',shiftSchema, 'shifts');
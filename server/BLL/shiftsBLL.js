const Shift = require('../model/shiftModel');
const mongoose = require('mongoose');



async function getAllShifts() {
    try {
        return await Shift.find();
    } catch (error) {
        console.error("Error getting all shifts:", error);
        throw error;
    }
}


const addShift = async (newShift) => {
    try {

        const id = new mongoose.Types.ObjectId();
        const newShiftWithId = { ...newShift, _id: id };

        const shift = new Shift(newShiftWithId);
        await shift.save();
        return "Shift created";
    } catch (error) {
        throw error;
    }
};

const updateShift = async (id, updatedShift) => {//REPLACE TO THEN ? 
    try {
        const { modifiedCount } = await Shift.updateOne({ _id: id }, updatedShift);
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};

module.exports = { getAllShifts, addShift, updateShift };
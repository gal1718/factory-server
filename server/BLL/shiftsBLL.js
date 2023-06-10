const Shift = require('../model/shiftModel');


async function getAllShifts() {
    return await Shift.find();

};

module.exports = {getAllShifts}
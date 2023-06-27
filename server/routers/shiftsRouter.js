const express = require('express');
const shiftsBLL = require('../BLL/shiftsBLL')
const router = express.Router(); //routerclass. express.router create new router instance. this class contain all rest type requests

//http://localhost:${port}/shifts - entry point


//get All shifts
router.route('/').get(async (req, res) => {  
        const shifts = await shiftsBLL.getAllShifts();
        res.json(shifts);
});

// Add a shift
router.route('/').post(async (req, res) => {
    try {
        const newShift = req.body;
        const shift = await shiftsBLL.addShift(newShift);
        res.json(shift);
    } catch (error) {
        console.error("Error adding a shift:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Update shift
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShift = req.body;
        await shiftsBLL.updateShift(id, updatedShift);
        res.json("Shift Updated");
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;


const express = require('express');
const shiftsBLL = require('../BLL/shiftsBLL')
const router = express.Router(); //routerclass. express.router create new router instance. this class contain all rest type requests

//http://localhost:${port}/shifts - entry point


//get All employess
router.route('/').get(async (req, res) => {
    
    const shifts = await shiftsBLL.getAllShifts();
    // console.log(shifts)
    res.json(shifts);

});



module.exports = router;


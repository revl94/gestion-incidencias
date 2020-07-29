const express = require('express');
//Project's own requires
const pool = require('../../database');
//Initializations
const router = express.Router();
const HttpStatus = require('http-status-codes');

//Rutas
router.get('/get_tickets', async (req, res) => {
    try {
        const ticket = await pool.query(`SELECT * FROM tickets
        ORDER BY tickets.tic_title ASC`);
        if (ticket.length > 0 ) {
            type= 'success';
            console.log(ticket);
            res.status(HttpStatus.OK).json({ticket, type});
        } else {
            type="Not Data";
            res.status(HttpStatus.OK).json({ticket, type});
        }

    } catch(err) {
        printError(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err})
    }
});
module.exports = router;

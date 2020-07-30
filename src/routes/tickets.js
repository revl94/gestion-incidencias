const express = require('express');
//Project's own requires
const pool = require('../../database');
//Initializations
const router = express.Router();
const HttpStatus = require('http-status-codes');

//Rutas
router.get('/get_tickets', async (req, res) => {
    try {
        await clockifyHours(51);
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

async function clockifyHours(reqId) {

    const cloHours = await pool.query(`SELECT act_time_loaded FROM activities 
            WHERE activities.req_id = '${reqId}'`);
    let totalHours = 0;
    for (let i = 0; i <= cloHours.length; i++) {
        totalHours+=cloHours[i];
    }

    console.log(totalHours);
    console.log(cloHours.length);


}

//Funcion para imprimir errores
function printError(e){
    if(e!=null){
        console.log(e)
    }
}

module.exports = router;

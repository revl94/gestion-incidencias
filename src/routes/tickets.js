const express = require('express');
const mysql = require('mysql');
const { promisify } = require('util');
//Project's own requires
const database  = require('../../config/config');
const glpi = mysql.createPool(database.glpi);

glpi.getConnection((err, connection) => {
    if(connection) connection.release();
    console.log('GLPI is connected');
    return;
});
glpi.query = promisify(glpi.query);
const pool = require('../../database');
//Initializations
const router = express.Router();
const HttpStatus = require('http-status-codes');

//Rutas
router.get('/get_ticket/:id', async (req, res) => {
    const { id } = req.params
    const result = await glpi.query('SELECT * FROM `glpidb`.`view_tickets_v3` WHERE `Id Ticket` = '+id)
    const count = await pool.query('SELECT * FROM tickets WHERE `tic_id` = '+id)
    if(count.length == 0){
        await pool.query('INSERT INTO tickets SET ?', 
            { "tic_id":result[0]["Id Ticket"], "tic_title": result[0]["Título"], "tic_description": result[0]["Descripción"], 
            "tic_branch": result[0]["Ramo"], "tic_subsidiary": result[0]["Sucursal"], "tic_deparment": result[0]["Departamento"], 
            "tic_usr_ci": result[0]["Username"], "tic_category": result[0]["Categoría"], "tic_priority": result[0]["Prioridad"], 
            "tic_assigned_to": result[0]["Asignado a"], "tic_date": result[0]["Fecha Solicitud"], "tic_last_update_date": result[0]["Fecha Último Cambio"], 
            "tic_closing_date": result[0]["Fecha Cierre"], "tic_sol_date": result[0]["Fecha Solución"] })
    }else{
        await pool.query('UPDATE tickets SET tic_title = ?, tic_description = ?, tic_branch = ?, tic_subsidiary = ?, tic_deparment = ?, tic_usr_ci = ?, tic_category = ?, tic_priority = ?, tic_assigned_to = ?, tic_date = ?, tic_last_update_date = ?, tic_closing_date = ?, tic_sol_date = ?  WHERE tic_id = ?', 
        [ result[0]["Título"], result[0]["Descripción"], result[0]["Ramo"], result[0]["Sucursal"], result[0]["Departamento"], result[0]["Username"], result[0]["Categoría"], result[0]["Prioridad"], result[0]["Asignado a"], result[0]["Fecha Solicitud"], ["Fecha Último Cambio"], result[0]["Fecha Cierre"], result[0]["Fecha Solución"], result[0]["Id Ticket"] ])
    }
    res.json({glpi: result})
});

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

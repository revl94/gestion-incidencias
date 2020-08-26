require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const { promisify } = require('util');
const axios = require('axios').default;
const https = require('https');
//Project's own requires
const database  = require('../../config/config');
const pool = require('../../database');
const workspaceId = '5c79aee1b079877a63415e08'
//Initializations
//Conexion a BD de GLPI
const glpi = mysql.createPool(database.glpi);
glpi.getConnection((err, connection) => {
    if(connection) connection.release();
    console.log('GLPI is connected');
    return;
});
glpi.query = promisify(glpi.query);
//Axios con token de Clockify
const ClockifyAxios = axios.create({
    baseURL: 'https://api.clockify.me/api/v1'
});
const Backend = axios.create({
    baseURL: process.env.baseURL,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
const TrelloAxios = axios.create({
    baseURL: 'https://api.trello.com/1'
});
TrelloAxios.defaults.headers.post['Content-Type'] = 'application/json';
const keyAndToken = process.env.keyAndToken;

ClockifyAxios.defaults.headers.common['Content-Type'] = 'application/json';
ClockifyAxios.defaults.headers.common['X-Api-Key'] = 'Xvy1392jqzm2LxBF';

const router = express.Router();
const HttpStatus = require('http-status-codes');
const { stat } = require('fs');

//Rutas
//ruta para devolver cartas no registradas

router.get('/get_not_reg', async (req, res) => {
    const result = await pool.query("SELECT *, (SELECT usr_name FROM user WHERE usr_email = x.nre_card_member_email LIMIT 1) AS name FROM no_register_mayoreo AS x;")
    res.json({cards: result})
});
//ruta para actualizar cartas no registradas

router.get('/update_not_reg', async (req, res) => {
    await getNotRegCards();
    await updateHoursNotReg();
    await syncCustomFieldsInNotReg();
    res.send("LISTO")
});

router.get('/update_all', async (req, res) => {
    //Ruta para el reporte de Incidencias
    await fillAllData()
    await syncViews();
    res.send("LISTO")
});
router.get('/get_tickets', async (req, res) => {
    //Ruta para el reporte de Incidencias
    const result = await pool.query('SELECT * FROM tickets');
    res.json({tickets: result})
});
router.get('/sync_views', async (req, res) => {
    //Ruta para sincronizar las fechas con la vista 3
    const cont = await syncViews();
    res.send("UPDATED: " + cont + " ROWS")
});
router.get('/get_ticket/:id', async (req, res) => {
    /*
    Ruta para obtener los datos del ticket
    Requiere ID del ticket  parametro: { id }
    Verificacion en base de datos de GPLI
    Trae los datos, los almacena(inserta o actualiza) en local y los retorna si la consulta fue exitosa
    Si la consulta no fue exitosa retorna la cadena "ERROR"
    */
    const { id } = req.params
    const result = await glpi.query('SELECT * FROM `glpidb`.`view_tickets_v4` WHERE `Id Ticket` = '+id)
    if(result.length == 0){
        res.send("ERROR")
    }else{
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
                [ result[0]["Título"], result[0]["Descripción"], result[0]["Ramo"], result[0]["Sucursal"], result[0]["Departamento"], result[0]["Username"], result[0]["Categoría"], result[0]["Prioridad"], result[0]["Asignado a"], result[0]["Fecha Solicitud"], result[0]["Fecha Último Cambio"], result[0]["Fecha Cierre"], result[0]["Fecha Solución"], result[0]["Id Ticket"] ])
        }
        /*
        Este bloque trae el usuario de GLPI, para actualizar o insertar en la BD del proyecto
        const user = await pool.query('SELECT * FROM user WHERE usr_ci = ' + result[0]["Username"]);
        const email = (await glpi.query('SELECT (SELECT `email` FROM `glpidb`.`glpi_useremails` WHERE `glpidb`.`glpi_useremails`.`id` = `glpidb`.`glpi_users`.`id`) AS `email` FROM `glpidb`.`glpi_users` WHERE `name` =' + result[0]["Username"]))[0].email;
        if(user.length == 0){
            await pool.query('INSERT INTO user SET ?', {"usr_name": result[0]["Asignado a"], "usr_email": email, "usr_ci": result[0]["Username"]})
        }else{
            await pool.query('UPDATE user SET usr_name = ?, usr_email = ?, usr_ci = ? WHERE usr_id = ?', [result[0]["Asignado a"], email, result[0]["Username"], user[0].usr_id]);
        }*/
        res.json({glpi: result})
    }
});

router.get('/get_hours/:id', async (req, res) => {
    /*
    Ruta para obtener las horas empleadas en un ticket
    Requiere ID del ticket  parametro: { id }
    Trae los datos desde clockify, los almacena(actualiza datos del ticket) en local y los retorna si la consulta fue exitosa
    Si la consulta no fue exitosa retorna la cadena "ERROR"
    */
    let { id } = req.params
    const ticket = await pool.query('SELECT * FROM tickets WHERE `tic_id` = "'+id+'"')
    let Tcont, TitleAndDesc;
    const containA = id.includes('A');//Es de apoyo
    const primID = id;
    if(containA){
        id = id.split('A')[0];
        Tcont = primID.split('A')[1];
        TitleAndDesc = id+ "-"+ticket[0].tic_title+":APOYO"+Tcont
    }else{
        TitleAndDesc = ticket[0].tic_id+ "-"+ticket[0].tic_title
    }
    
    if(ticket.length == 0){
        res.send("ERROR")
    }else{
        const user =  await pool.query('SELECT * FROM user WHERE `usr_ci` = '+ticket[0].tic_usr_ci);
        if(user.length == 0){
            res.send("ERROR")
        }else{
            let userId = await getUserID(user[0].usr_email);
            if(userId.length > 0){
                userId = userId[0].id;
                const hours = await getTimeEntries(userId, TitleAndDesc)
                if(hours.length > 0){
                    let time = {}
                    let min = 0
                    let totalmin = 0
                    let totalhours = 0
                    hours.forEach(async (dat, i) => {
                        oldFormat = hours[i].timeInterval.duration
                        newFormat = oldFormat.split('PT')
                        isH = checkH(newFormat[1])
                        isM = checkM(newFormat[1])
                        isS = checkS(newFormat[1])
                        timeFormatted = formatTime(isH, isM, isS)
                        time[i] = {
                            "description": hours[i].description,
                            "hours": timeFormatted[0],
                            "minutes": timeFormatted[1],
                            "seconds": timeFormatted[2]
                        }
                        min = (parseInt(timeFormatted[0])*60) + parseInt(timeFormatted[1])
                        totalmin += min
                    })
                    totalhours = Math.round((totalmin / 60)*100)/100
                    await pool.query('UPDATE tickets SET tic_clockify_time = ?  WHERE tic_id = ?',
                        [totalhours , primID])
                    res.json({finaltime: totalhours})
                }else{
                    await pool.query('UPDATE tickets SET tic_clockify_time = ?  WHERE tic_id = ?',
                        ["0" , primID])
                    res.json({finaltime: "0"})
                }
            }else{
                await pool.query('UPDATE tickets SET tic_clockify_time = ?  WHERE tic_id = ?',
                    ["0" , primID])
                res.json({finaltime: "0"})
            }
        }
    }
});

router.get('/create_ticket/:id', async (req, res) => {
    let { id } = req.params
    const containA = id.includes('A');//Es de apoyo
    const primID = id;
    let tickets;
    if(containA){
        id = id.split('A')[0]
        tickets = await pool.query('SELECT * FROM tickets WHERE `tic_id` LIKE "' + id + '%"')
    }
    const ticket = await pool.query('SELECT * FROM tickets WHERE `tic_id` = "' + id + '"')
    
    if(ticket.length == 0){
        res.send("Ticket no inicializado. Debe inicializar le ticket para poder procesarlo")
    }else{
        if(ticket[0].tic_card_id == null || containA){
            Backend.post('/trello/post_card',{
                "tic_id": primID}).then(async (response) => {
                if(response.data != "ERROR"){
                    const updatecard = await Backend.get('/trello/update_card/'+(containA ?  id+"A"+tickets.length : primID));
                    res.send("LISTO")
                }else{
                    res.send("Faltan datos para poder actualizar el ticket o los mismos son erroneos, por favor verifique la informacion y vuelva a intentar")
                }
            }).catch(e => {
                console.log(e);
                res.send("Error en Trello, no se pudieron crear las cartas.")
            });
        }else{
            res.send("La tarjeta ya se encuentra creada en Trello")
        }
    }
});
router.get('/update_ticket/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await pool.query('SELECT * FROM tickets WHERE `tic_id` = "'+id +'" AND `tic_card_id` IS NOT NULL')
    if(ticket.length == 0){
        res.send("Ticket no inicializado. Debe inicializar el ticket para poder procesarlo")
    }else{
        const boardID = (await pool.query('SELECT * FROM branch WHERE ram_name = "'+ticket[0].tic_branch +'"'))[0].board_id
        const validated = await getCardStatus(ticket[0], boardID)
        if(validated){
            res.send("Ticket validado, no se puede volver a procesar")
        }else{
            const hours = await Backend.get('/tickets/get_hours/'+id);
            if(hours != "ERROR"){
                if(ticket[0].tic_card_id != null){
                    const updatecard = await Backend.get('/trello/update_card/'+id);
                    res.send("LISTO")
                }else{
                    res.send("Ticket no inicializado. Debe inicializar le ticket para poder procesarlo")
                }
                
            }else{
                res.send("Error en clockify, verifique la informacion del usuario.")
            }
        }
    }
});

function getUserID(email) {
    return new Promise(async (resolve, reject) => {
        try {
            ClockifyAxios.get(`/workspaces/${workspaceId}/users?email=${email}`)
            .then( (result) => {
                resolve(result.data);
            }).catch((err) => {
                resolve([]);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function getTimeEntries(userId, descp) {

    return new Promise(async (resolve,reject) => {
        try {
            const params = {
                description: descp,
            }
            const result = await ClockifyAxios.get(`/workspaces/${workspaceId}/user/${userId}/time-entries`, {params})
            resolve(result.data)
        } catch (error) {
            printError(error)
            reject(error)
        }
    });
}

function checkH(duration) {
    return duration.indexOf("H");
}

function checkM(duration) {
    return duration.indexOf("M");
}

function checkS(duration) {
    return duration.indexOf("S");
}

function formatTime(isH, isM, isS) {
    hours= 0
    seconds= 0
    minutes= 0
    if(isH > 0 && isM > 0 && isS > 0){
        splitH = newFormat[1].split('H')
        hours = splitH[0]
        splitM = splitH[1].split('M')
        minutes = splitM[0]
        splitS = splitM[1].split('S')
        seconds = splitS[0]
    }else if (isH > 0 && isM > 0 && isS < 0) {
        splitH = newFormat[1].split('H')
        hours = splitH[0]
        splitM = splitH[1].split('M')
        minutes = splitM[0]
    }else if (isH > 0 && isS > 0 && isM < 0){
        splitH = newFormat[1].split('H')
        hours = splitH[0]
        splitS = splitH[1].split('S')
        seconds = splitS[0]
    }else if (isM > 0 && isS > 0 && isH < 0){
        splitM = newFormat[1].split('M')
        minutes = splitM[0]
        splitS = splitM[1].split('S')
        seconds = splitS[0]
    }else if( isH > 0 && isM < 0 && isS < 0){
        splitH = newFormat[1].split('H')
        hours = splitH[0]
    }else if( isH == -1 && isM >= 0 && isS == -1){

        splitM = newFormat[1].split('M')
        minutes = splitM[0]
    }else if( isH < 0 && isM < 0 && isS > 0){
        splitS = newFormat[1].split('S')
        seconds = splitS[0]
    }
    let time = [hours, minutes, seconds]
    return time
}

// Funcion para actualizar a las 12 AM
async function fillAllData(){
    const tickets = await pool.query('SELECT * FROM tickets WHERE tic_card_status = "false"')
    let result;
    for(i = 0; i<tickets.length; i++){
        result = await Backend.get('/tickets/update_ticket/'+tickets[i].tic_id);
        await new Promise(resolve => setTimeout(resolve, 3000));
        if(result.data == "LISTO"){
            console.log("Tickect #"+tickets[i].tic_id+": ticket actualizado")
        }else{
            console.log("Tickect #"+tickets[i].tic_id+": Error actualizando este ticket")
        }
    }
}
const interval_long =  60*60*1000;//1 hora
async function timer(interval_long){
    const date = (new Date(new Date().toLocaleString("en-US", {timeZone: "America/Caracas"}))).getHours(); // Create a Date object to find out what time it is
    if((date < 13 && date > 12) || (date < 19 && date > 18) ){ // Check the time at 12:00PM - 01:00PM OR 06:00PM - 07:00PM
        await fillAllData()
    }
    setTimeout(function(){ timer(interval_long); }, interval_long);//Renew timer
}
timer(interval_long)

//Funcion para imprimir errores
function printError(e){
    if(e!=null){
        console.log(e)
    }
}
function getCardStatus(ticket, boardID) {
    const cardID = ticket.tic_card_id
    return new Promise(async (resolve,reject) => {
        try {
          const lists = (await TrelloAxios.get(`/boards/${boardID}/lists${keyAndToken}`)).data;
          //const initList = lists.filter( (el) => el.name.toUpperCase() == "Por Iniciar".toUpperCase() )[0].id
          //const endList = lists.filter( (el) => el.name.toUpperCase() == "Finalizadas".toUpperCase() )[0].id
          const valtList = lists.filter( (el) => el.name.toUpperCase() == "Validadas".toUpperCase() )[0].id
          const card = (await TrelloAxios.get(`/boards/${boardID}/cards/${cardID+keyAndToken}`)).data;
          if(card.idList == valtList){
            await pool.query('UPDATE tickets SET tic_card_status = ?  WHERE tic_id = ?',
            ["true", ticket.tic_id]);
            resolve(true)
          }else{
            resolve(false)
          }
          resolve(result)
        } catch (error) {
          reject(error)
        }
      });
}
async function getNotRegCards(){
    const lists = (await TrelloAxios.get(`/boards/${process.env.notRegID}/lists${keyAndToken}`)).data;
    const endList = lists.filter( (el) => el.name.toUpperCase() == "Finalizadas".toUpperCase() )[0].id;
    const valtList = lists.filter( (el) => el.name.toUpperCase() == "Validadas".toUpperCase() )[0].id;
    const cards = (await TrelloAxios.get(`/boards/${process.env.notRegID}/cards${keyAndToken}`)).data.filter( (el) => el.idList != valtList );
    if(cards.length >=1){
        let exist, nre, email, status
        for(i = 0; i < cards.length; i++){
            status = 0;
            if(cards[i].idList == endList){
                await TrelloAxios.put(`/cards/${cards[i].id}/${keyAndToken}&idList=${valtList}`)
                status = 1;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            email = (await TrelloAxios.get(`/cards/${cards[i].id}/members${keyAndToken}`)).data[0].id;
            email = await trelloGetEmail(email);
            exist = (await pool.query("SELECT if(COUNT(*)>0,'true','false') AS my_bool FROM no_register_mayoreo WHERE nre_card_id = '"+cards[i].id+"';"))[0].my_bool
            if(exist == 'true'){
                nre = await pool.query("SELECT * FROM no_register_mayoreo WHERE nre_card_id = '"+cards[i].id+"';")
                await pool.query('UPDATE no_register_mayoreo SET nre_title = ?, nre_decription = ?, nre_card_id = ?, nre_card_member_email = ?, nre_card_status = ? WHERE nre_id = ?', [ cards[i].name, (cards[i].desc == undefined ? "" : cards[i].desc), cards[i].id, email, status,nre[0].nre_id ]);
            }else{
                await pool.query('INSERT INTO no_register_mayoreo SET ?', {"nre_title": cards[i].name, "nre_decription": (cards[i].desc == undefined ? "" : cards[i].desc),  "nre_card_id": cards[i].id, "nre_card_member_email": email, "nre_card_status": status})
            }
        }
    }
    return "LISTO";
}
async function trelloGetEmail(userID){
    const users = await pool.query('SELECT * FROM user');
    let userID2, email = "";
    for(i = 0; i < users.length; i++){
        await new Promise(resolve => setTimeout(resolve, 3000));
        userID2 = (await TrelloAxios.get(`/members/${users[i].usr_email}${keyAndToken}`)).data.id;
        if(userID == userID2){
            email = users[i].usr_email;
            break;
        }
    }
    return email;
}
async function updateHoursNotReg(){
    const nr = await pool.query("SELECT * FROM no_register_mayoreo WHERE nre_card_status != 2;")
    if(nr.length >= 1){
        for(i = 0; i < nr.length; i++ ){
            await new Promise(resolve => setTimeout(resolve, 1000));
            userId = await getUserID(nr[i].nre_card_member_email);
            if(userId.length > 0){
                userId = userId[0].id;
                hours = await getTimeEntries(userId, nr[i].nre_title)
                if(hours.length > 0){
                    time = {}
                    min = 0
                    totalmin = 0
                    totalhours = 0
                    hours.forEach(async (dat, i) => {
                        oldFormat = hours[i].timeInterval.duration
                        newFormat = oldFormat.split('PT')
                        isH = checkH(newFormat[1])
                        isM = checkM(newFormat[1])
                        isS = checkS(newFormat[1])
                        timeFormatted = formatTime(isH, isM, isS)
                        time[i] = {
                            "description": hours[i].description,
                            "hours": timeFormatted[0],
                            "minutes": timeFormatted[1],
                            "seconds": timeFormatted[2]
                        }
                        min = (parseInt(timeFormatted[0])*60) + parseInt(timeFormatted[1])
                        totalmin += min
                    })
                    totalhours = Math.round((totalmin / 60)*100)/100
                    await pool.query('UPDATE no_register_mayoreo SET nre_clockify_time = ?  WHERE nre_id = ?',
                        [totalhours , nr[i].nre_id])
                }else{
                    await pool.query('UPDATE no_register_mayoreo SET nre_clockify_time = ?  WHERE nre_id = ?',
                        ["0" , nr[i].nre_id])
                }
            }else{
                await pool.query('UPDATE no_register_mayoreo SET nre_clockify_time = ?  WHERE nre_id = ?',
                    ["0" , nr[i].nre_id])
            }
        }
    }
    return "LISTO";
}
async function syncCustomFieldsInNotReg(){
    const nr = await pool.query("SELECT * FROM no_register_mayoreo WHERE nre_card_status != 2;")
    if(nr.length >= 1){
        for(i = 0; i < nr.length; i++ ){
            await new Promise(resolve => setTimeout(resolve, 1000));
            CF = await getCustomFieldsInCard(nr[i].nre_card_id);
            for(j = 0; j < CF.length; j++ ){
                if(CF[j].value.date != undefined){
                    await pool.query('UPDATE no_register_mayoreo SET nre_date = ? WHERE nre_id = ?', [new Date(CF[j].value.date).toISOString().slice(0, 19).replace('T', ' ') , nr[i].nre_id ]);
                }else if(CF[j].value.text != undefined){
                   await pool.query('UPDATE no_register_mayoreo SET nre_applicant = ? WHERE nre_id = ?', [ CF[j].value.text , nr[i].nre_id ]);
                }
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            await updateCustomFieldsNotReg(process.env.notRegID, nr[i] );
        }
    }
    await pool.query("UPDATE no_register_mayoreo SET nre_card_status = 2 WHERE nre_card_status = 1")
    return "LISTO";
}
function getCustomFieldsInCard(cardID) {
    return new Promise(async (resolve,reject) => {
        try {
          const result = await TrelloAxios.get(`/cards/${cardID}/customFieldItems${keyAndToken}`);
          resolve(result.data)
        } catch (error) {
          reject(error)
        }
      });
}
async function updateCustomFieldsNotReg(idBoard, nr ) {
    const fields = ( await TrelloAxios.get(`/boards/${idBoard}/customFields${keyAndToken}`) ).data
    for (let j = 0; j < fields.length; j++) {
        if(fields[j].name == 'HH Clockify'){
            await TrelloAxios.put(`/cards/${nr.nre_card_id}/customField/${fields[j].id}/item${keyAndToken}`, {value:{number: nr.nre_clockify_time}})
        }  
    }
  return "ACTUALIZADO";
}
async function syncViews(){
    const tickets = await pool.query('SELECT * FROM tickets');
    let inView3, id, cont = 0;
    for(i = 0; i < tickets.length; i++){
        id = (tickets[i].tic_id.includes('A') ? tickets[i].tic_id.split("A")[0] : tickets[i].tic_id );
        inView3 = await glpi.query('SELECT * FROM `glpidb`.`view_tickets_v3` WHERE `Id Ticket` = ' + id)
        if(inView3.length != 0){
            cont++;
            inView3= inView3[0]
            await pool.query('UPDATE tickets SET tic_date = ?, tic_last_update_date = ?, tic_closing_date = ?, tic_sol_date = ?  WHERE tic_id = ?',
                [ inView3["Fecha Solicitud"], inView3["Fecha Último Cambio"], inView3["Fecha Cierre"], inView3["Fecha Solución"],  tickets[i].tic_id ])
        }
    }
    return cont;
}
module.exports = router;

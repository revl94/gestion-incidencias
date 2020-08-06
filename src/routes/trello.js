const express = require('express');
//Project's own requires
const axios = require('axios');
const pool = require('../../database');
const HttpStatus = require('http-status-codes');
//Initializations
const router = express.Router();
// Inicializamos una instancia de axios para trello
const TrelloAxios = axios.create({
    baseURL: 'https://api.trello.com/1'
});
TrelloAxios.defaults.headers.post['Content-Type'] = 'application/json';
const keyAndToken = '?key=5d94aa42b86a6f4e11d7cd857ff8699a&token=22b262d7b19e02d785a2b1fa0ba982e55ab891122b07d7ff79ffda934f7a4e28';

//Rutas
router.get('/post_board', async (req, res) => {

    const cardId = "5f2c7177092431578a66a0e6";
    const labelId = "5f2c6cfe387b09205c69fa0b"; // label verde
    // const labelId = "5f2c6cfed5c12947ebaeecc7"; //label amarillo
    // const labelId = "5f2c6cff919029150b4dc490"; //label rojo
    const listId = "5f2c70b1790f8b33013901e7";

   try {
      // board = await createLabel(idBoard);
      // console.log(board[0].id);
      //  console.log(board[1].id);
      //  console.log(board[2].id);
       board = await removeLabelToCard(cardId, labelId);
      // board = await createCard(listId, "Preuba card2", "Hello")
       res.json({
           board
       })

   } catch(err) {
        printError(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err})
}

});
// Ruta para Crear lista sobre un board indicado
router.get('/post_list', async (req, res) => {
    const nombre = "PruebaName";
    const pruebaBoard = "5f21ba1b3ebc598396b5bf29";
    try {
       list = await createList(pruebaBoard, nombre);
        res.json({
            list
        })

    } catch(err) {
        printError(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err})
    }

});

// Ruta para crear un card en una lista especifica
router.post('/post_card', async (req, res) => {
    const {tic_id} = req.body;
    const ticket = await pool.query('SELECT * FROM tickets WHERE tic_id = '+ tic_id)
    if(ticket.length > 0){
        //const email = 'eleon@intelix.biz'
        let email = (await pool.query('SELECT * FROM user WHERE `usr_ci` = '+ticket[0].tic_usr_ci))
        if(email.length!=0){
            email = email[0].usr_email
            if(ticket[0].tic_card_id == null){
                const branch = await pool.query('SELECT * FROM branch WHERE ram_name = "'+ticket[0].tic_branch +'"')
                if(branch[0].board_custom_create == 1){
                    try {
                        card = await createCard(branch[0].list_id, ticket[0].tic_id+ "-"+ticket[0].tic_title, ticket[0].tic_id+ "-"+ticket[0].tic_title);
                        await pool.query('UPDATE tickets SET tic_card_id = ?  WHERE tic_id = ?',
                            [card.id, tic_id]);
                        await addMember(email, card.id)
                        res.send("CREADA")
                    } catch(err) {
                        printError(err);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err})
                    }
                }else{
                    await createCustomFields(branch[0].board_id)
                    await pool.query('UPDATE branch SET board_custom_create = ?  WHERE ram_id = ?',
                        [1, branch[0].ram_id])
                    try {
                        card = await createCard(branch[0].list_id, ticket[0].tic_id+ "-"+ticket[0].tic_title, ticket[0].tic_id+ "-"+ticket[0].tic_title);
                        await pool.query('UPDATE tickets SET tic_card_id = ?  WHERE tic_id = ?',
                            [card.id, tic_id])
                        res.send("CREADA")
                    } catch(err) {
                        printError(err);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err})
                    }
                }
            }else{
                res.send("CREADA")
            }
        }else{
            res.send("ERROR")
        }
    }else{
        res.send("ERROR")
    }
});

router.get('/update_card/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await pool.query('SELECT * FROM tickets WHERE tic_id = ' + id + ' AND tic_card_id IS NOT NULL')
    if(ticket.length > 0){
        const branch = await pool.query('SELECT * FROM branch WHERE ram_name = "'+ticket[0].tic_branch +'"')
        const update = await updateCustomFields(branch[0].board_id, ticket[0]);
        res.json(update)
    }else{
        res.send("ERROR")
    }
});

// Ruta para crear los labels
router.get('/post_label/:idBoard', async (req, res) => {
    const { idBoard } = req.params;  //"5f21ba1b3ebc598396b5bf29";
    const branch = await pool.query(`SELECT ram_id FROM branch WHERE board_id = '${idBoard}'`);

    try {
        board = await createLabel(idBoard);
         console.log(board[0].id);
         console.log(board[1].id);
         console.log(board[2].id);
         await pool.query('INSERT INTO label_trello SET ?', { "lab_0_or_2": board[0].id ,
            "lab_2_or_5": board[1].id, "lab_5_or_more": board[2].id, "branch_id": branch[0]});

        res.json({
            board
        })

    } catch(err) {
        printError(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err})
    }
});

// Funcion para crear un board
function createBoard(name) {
    return new Promise(async (resolve, reject) => {
        try {
            const board = await TrelloAxios.post(`/boards${keyAndToken}`,
                {"name": name, "defaultLists": "false" });
            resolve(board.data)
        } catch (error) {
            reject(error);
        }
    });
}

// Funcion para crear una lista
function createList(boardId, name) {
    return new Promise(async (resolve,reject) => {
        try {
            const list = await TrelloAxios.post(`/boards/${boardId}/lists${keyAndToken}`, {"name": name });
            resolve(list.data)
        } catch (error) {
            reject(error)
        }
    });
}

// Funcion para crear un card
function createCard(listId, cardName, cardDesc) {

    return new Promise(async (resolve,reject) => {

        try {
            const card = await TrelloAxios.post(`/card${keyAndToken}`, {"name": cardName,"idList": listId, "desc": cardDesc});

            resolve(card.data)
        } catch (error) {
            reject(error)
        }
    });
}

// Funcion para obtener todos los boards
function getBoards() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await TrelloAxios.get(`/members/intelix_prueba/boards${keyAndToken}`);

            resolve(result.data)
        } catch (err) {
            console.log(err);
            reject(err)
        }
    });
}

// Funcion para crear card dado un ticket
function createCardByTicket(ticId) {
    return new Promise(async (resolve, reject) => {
        let newArray = [];
        try {
            const result = await pool.query(`SELECT tic_id, tic_title,
              (SELECT board_id FROM branch
               WHERE ram_name IN (SELECT tic_branch FROM tickets WHERE tic_id = '${ticId}')) AS board_id,
               (SELECT list_id FROM branch
               WHERE ram_name IN (SELECT tic_branch FROM tickets WHERE tic_id = '${ticId}')) AS list_id
               FROM dbgestionocupacion.tickets WHERE tic_id = '${ticId}'`);

                // Convertir en un array
                newArray.push(result[0]);

                // Llamado a la funcion crear card
            await createCard(newArray[0].list_id, newArray[0].tic_id + newArray[0].tic_title, "Descripcion de prueba");

            resolve(result)
        } catch (err) {
            console.log(err);
            reject(err)
        }

    });

}
async function addMember(email, cardId){
    return new Promise(async (resolve,reject) => {
        try {
          
          const result = await TrelloAxios.get(`/members/${email}${keyAndToken}`);
          const memberId = result.data.id
          await new Promise(resolve => setTimeout(resolve, 6000));
          const result1 = await TrelloAxios.post(`/card/${cardId}/idMembers${keyAndToken}`, {"value": memberId});
          resolve(result1.data)
        } catch (error) {
          reject(error)
        }
      });
  }
function createCustomFields(boardId) {
    return new Promise(async (resolve,reject) => {
        try {
          async function createCustomFieldsprocess(resolve){
            const result = await TrelloAxios.post(`/customField${keyAndToken}`, {"idModel":boardId,
          "modelType": "board",
          "name": "Fecha de creacion del ticket",
          "type":"date"});
          await new Promise(resolve => setTimeout(resolve, 6000));
          const result2 = await TrelloAxios.post(`/customField${keyAndToken}`, {"idModel":boardId,
          "modelType": "board",
          "name": "Fecha de la ultima actualizacion del ticket",
          "type":"date"});
          await new Promise(resolve => setTimeout(resolve, 6000));
          const result3 = await TrelloAxios.post(`/customField${keyAndToken}`, {"idModel":boardId,
          "modelType": "board",
          "name": "Fecha de la solicitud",
          "type":"date"});
          await new Promise(resolve => setTimeout(resolve, 6000));
          const result4 = await TrelloAxios.post(`/customField${keyAndToken}`, {"idModel":boardId,
          "modelType": "board",
          "name": "Fecha de cierre",
          "type":"date"});
          await new Promise(resolve => setTimeout(resolve, 6000));
          const result5 = await TrelloAxios.post(`/customField${keyAndToken}`, {"idModel":boardId,
          "modelType": "board",
          "name": "HH Clockify",
          "type":"text"});
          await new Promise(resolve => setTimeout(resolve, 6000));
          resolve(result5.data)
          }
          setTimeout( function(){ createCustomFieldsprocess(resolve); }, 2000);
        } catch (error) {
          reject(error)
        }
      });
  }
  async function updateCustomFields(idBoard, ticket) {
    const fields = ( await TrelloAxios.get(`/boards/${idBoard}/customFields${keyAndToken}`) ).data
    for (let j = 0; j < fields.length; j++) {
        await new Promise(resolve => setTimeout(resolve, 6000));
        if(fields[j].name == 'Fecha de creacion del ticket'){
            await TrelloAxios.put(`/cards/${ticket.tic_card_id}/customField/${fields[j].id}/item${keyAndToken}`, {value:{date: ticket.tic_date}})
        }else if(fields[j].name == 'Fecha de la ultima actualizacion del ticket'){
            await TrelloAxios.put(`/cards/${ticket.tic_card_id}/customField/${fields[j].id}/item${keyAndToken}`, {value:{date: ticket.tic_date}});
        }else if(fields[j].name == 'Fecha de la solicitud'){
            await TrelloAxios.put(`/cards/${ticket.tic_card_id}/customField/${fields[j].id}/item${keyAndToken}`, {value:{date: ticket.tic_date}})
        }else if(fields[j].name == 'Fecha de cierre'){
            await TrelloAxios.put(`/cards/${ticket.tic_card_id}/customField/${fields[j].id}/item${keyAndToken}`, {value:{date: ticket.tic_date}})
    }else if(fields[j].name == 'HH Clockify'){
        await TrelloAxios.put(`/cards/${ticket.tic_card_id}/customField/${fields[j].id}/item${keyAndToken}`, {value:{text: ticket.tic_clockify_time}})
    }  
  }
  return "ACTUALIZADO";
  }

// Funcion para crear un label
function createLabel( idBoard ) {

    const labelName1= "De 0 a 2 dias";
    const color1 = "green";
    const labelName2= "De 2 a 5 dias";
    const color2 = "orange";
    const labelName3= "Mas de 5 dias";
    const color3 = "red";

    return new Promise(async (resolve,reject) => {

        try {

            const label1 = await TrelloAxios.post(`/labels${keyAndToken}`, {"name": labelName1,"color": color1, "idBoard": idBoard});
            const label2 = await TrelloAxios.post(`/labels${keyAndToken}`, {"name": labelName2,"color": color2, "idBoard": idBoard});
            const label3 = await TrelloAxios.post(`/labels${keyAndToken}`, {"name": labelName3,"color": color3, "idBoard": idBoard});

            resolve([label1.data, label2.data, label3.data])
        } catch (error) {
            reject(error)
        }
    });
}

// Agregar label a un card
function addLabelToCard( cardId, labelId ) {

    return new Promise(async (resolve,reject) => {

        try {
            const add = await TrelloAxios.post(`/cards/${cardId}/idLabels${keyAndToken}`, { "value": labelId });
            resolve(add.data)
        } catch (error) {
            reject(error)
        }
    });
}

// Remover label a un card
function removeLabelToCard( cardId, labelId ) {

    return new Promise(async (resolve,reject) => {

        try {
            const remove = await TrelloAxios.delete(`/cards/${cardId}/idLabels/${labelId}${keyAndToken}`);
            resolve(remove.data)
        } catch (error) {
            reject(error)
        }
    });
}


// Obtener labels de un board
function getLabels( boardId ) {
    return new Promise(async (resolve,reject) => {

        try {

            const labels = await TrelloAxios.get(`/boards/${boardId}/labels${keyAndToken}`);
            resolve(labels.data)
        } catch (error) {
            reject(error)
        }
    });

}


//Funcion para imprimir errores
function printError(e){
    if(e!=null){
        console.log(e)
    }
}
module.exports = router;
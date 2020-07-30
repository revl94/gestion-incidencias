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
router.get('/post_card', async (req, res) => {
   try {
       boards = await getBoards();

       // con esto veo que id tiene el board
            if (boards.length > 0 ) {
                type= 'success';
                console.log(boards);
                res.status(HttpStatus.OK).json({boards, type});
            } else {
                type="Not Data";
                res.status(HttpStatus.OK).json({boards, type});
            }
   } catch(err) {
        printError(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err})
}

});


function getBoards() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await TrelloAxios.get(`/members/intelix_prueba/boards${keyAndToken}`);
            // No encontraba otra forma de que me tome el valor id, tambien funcionaba con un forEach
            for (const data of result.data) {
                // Condicion para que busque un board indicado, esto se deberia cambiar para compararlo
                //con el guardado en la base de datos
                if (data.id === '5f21ba1b3ebc598396b5bf29') {
                   board = await createList(data.id, 'To do list');
                    console.log(board);
                }

            }
            resolve(result.data)
        } catch (err) {
            console.log(err);
            reject(err)
        }
    });
}

function createList(boardId, name) {
    return new Promise(async (resolve,reject) => {
        try {
            const result = await TrelloAxios.post(`/boards/${boardId}/lists${keyAndToken}`, {"name": name });

                    // Crea un card en la lista creada
                    list = await createCard(result.data.id, 'prueba card', 'descripcion de prueba' );
                    console.log(list);

            resolve(result.data)
        } catch (error) {
            reject(error)
        }
    });
}

function createCard(listId, cardName, cardDesc) {

    return new Promise(async (resolve,reject) => {

        try {
            const result = await TrelloAxios.post(`/card${keyAndToken}`, {"name": cardName,"idList": listId, "desc": cardDesc});

            resolve(result.data)
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
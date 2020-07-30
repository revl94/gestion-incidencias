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
    const nombre= "PruebaName";
   try {
      board = await createBoard(nombre);
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
router.get('/post_card', async (req, res) => {
    const nombre = "PruebaName";
    const desc = "Descripcion de prueba";
    const pruebaList = "5f2332b8eb35fe4e205d549e";
    try {
        card = await createCard(pruebaList, nombre, desc);
        res.json({
            card
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
            console.log(board.data);
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
            console.log(list.data);
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




//Funcion para imprimir errores
function printError(e){
    if(e!=null){
        console.log(e)
    }
}
module.exports = router;
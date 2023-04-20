import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readNote } from './notes.js';
import { FunkoOperations } from './funkoOperations.js';
import { Funko, Tipo, Genero } from './funko.js'

const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));

app.delete('/funkos', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;
  const funkoOperation = new FunkoOperations(user);

  const respuesta = funkoOperation.deleteFunko(id, user);
    if ( respuesta === false){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no existe'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
})

app.patch('/funkos', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;
  const name = req.query.name as string;
  const desc = req.query.desc as string;
  const type = req.query.type as Tipo;
  const genre = req.query.genre as Genero;
  const franchise = req.query.franchise as string;
  const number = parseInt(req.query.number as string);
  const exclusive = parseInt(req.query.exclusive as string);
  const specialCharacter = req.query.specialCharacter as string;
  const value = parseInt(req.query.value as string);

  const funkoOperation = new FunkoOperations(user);

  if (exclusive === 0){
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: false,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.updateFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no existente'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }else{
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: true,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.updateFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no existente'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }  
});

app.post('/funkos', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;
  const name = req.query.name as string;
  const desc = req.query.desc as string;
  const type = req.query.type as Tipo;
  const genre = req.query.genre as Genero;
  const franchise = req.query.franchise as string;
  const number = parseInt(req.query.number as string);
  const exclusive = parseInt(req.query.exclusive as string);
  const specialCharacter = req.query.specialCharacter as string;
  const value = parseInt(req.query.value as string);

  const funkoOperation = new FunkoOperations(user);

  if (exclusive === 0){
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: false,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.addFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko ya añadido'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }else{
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: true,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.addFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko ya añadido'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }  
});

app.get('/funkos', (req, res) =>{
  const user = req.query.user as string;
  const id = req.query.id as string;

  const funkoOperation = new FunkoOperations(user);

  if (!user){
    res.status(400).json({error: 'El parámetro user es obligatorio'});
    return;
  }

  if (!id){
    //Mostrar todos los funkos
    const respuesta = funkoOperation.listFunkos(user);
    if ( respuesta === "Error"){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no encontrado'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }else{
    //Mostrar la info del funko indicado
    const respuesta = funkoOperation.getFunkoById(id, user);
    if ( respuesta === "Error"){
      res.status(500).json({error: 'Error al ejecutar la operación, lista vacía'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }


});

app.get('/notes', (req, res) => {
  if (!req.query.title) {
    res.send({
      error: 'A title has to be provided',
    });
  } else {
    readNote(req.query.title as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (!data!.success) {
        res.send({
          error: `No note was found`,
        });
      } else {
        res.send({
          notes: data!.notes,
        });
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
  console.log('http://localhost:3000');
});


/*import * as net from 'net';
import {RequestType, ResponseType} from "./types.js";
import { FunkoOperations } from './funkoOperations.js';
import {Funko, Genero, Tipo} from './funko.js';
import chalk from 'chalk';

const SERVER_PORT = 8080;
const SERVER_HOST = 'localhost';

const server = net.createServer((socket) => {
  console.log(chalk.yellow('Client connected'));

  socket.on('data', (data) => {
    console.log(chalk.blue('Data received from client'));
    const message = JSON.parse(data.toString());
    const command = message.type;
    const user = message.user;
    const funko: Funko = message.funkoPop;
    const response: ResponseType = {
      type: 'read',
      success: true,
      funkoPop: funko,
      message: "test"
    };
    const funkoOperations = new FunkoOperations(user);
    switch (command) {
      case "add":
        const prueba_add = funkoOperations.addFunko(message.funkoPop, user);
        if (prueba_add === true){
          response.success = true;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = `New Funko added to ${user} collection!`;
        }else{
          response.success = false;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = `Funko already exists at ${user} collection!`;
        }
        socket.write(JSON.stringify(response));
        break;
      case "update":
        const prueba_update = funkoOperations.updateFunko(message.funkoPop, user);
        if (prueba_update === true){
          response.success = true;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = `Funko updated at ${user} collection!`;
        }else{
          response.success = false;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = `Funko not found at ${user} collection!`;
        }
        socket.write(JSON.stringify(response));
        break;
      case "remove":
        const prueba_remove = funkoOperations.deleteFunko(message.funkoPop.id, user);
        if (prueba_remove === true){
          response.success = true;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = `Funko removed from ${user} collection!`;
        }else{
          response.success = false;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = `Funko not found at ${user} collection!`;
        }
        socket.write(JSON.stringify(response));
        break;
      case "read":
        const prueba_read = funkoOperations.getFunkoById(message.funkoPop.id, user);
        if( prueba_read === "Error"){
          response.success = false;
          response.type = message.type;
          response.message = `Funko not found at ${user} collection!`;
        }else{
          response.success = true;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = prueba_read;
        };
        socket.write(JSON.stringify(response));
        break;
      case "list":
        const prueba_list = funkoOperations.listFunkos(user);
        if(prueba_list === "Error"){
          response.success = false;
          response.type = message.type;
          response.message = `No Funkos in the list of ${user}`;
        }else{
          response.success = true;
          response.type = message.type;
          response.funkoPop = message.funko;
          response.message = prueba_list;
        }
        socket.write(JSON.stringify(response));
        break;
    }
  });

  socket.on('end', () => {
    console.log(chalk.red('Client disconnected'));
    console.log("---------------------------------------------------");
  });
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log("---------------------CONEXION----------------------")
  console.log(chalk.yellow(`Server listening on ${SERVER_HOST}:${SERVER_PORT}`));
});*/

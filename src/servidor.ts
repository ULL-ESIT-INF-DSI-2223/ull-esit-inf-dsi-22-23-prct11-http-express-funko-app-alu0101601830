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

app.listen(3000, () => {
  console.log('Server is up on port 3000');
  console.log('http://localhost:3000');
});
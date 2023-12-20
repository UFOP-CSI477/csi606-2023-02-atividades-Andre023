import { Router } from "express";
import { GetAllTipo } from "../controller/tipo/GetAllTipo.js";
import { GetByIdTipo } from "../controller/tipo/GetByIdTipo.js";
import { CreateTipo } from "../controller/tipo/CreateTipo.js";
import { UpdateTipo } from "../controller/tipo/UpdateTipo.js";
import { DeleteTipo } from "../controller/tipo/DeleteTipo.js";

const tipoRouter = Router();

// GET ALL
const getAllTipo = new GetAllTipo();
tipoRouter.get('/tipo', getAllTipo.handle);

// GET BY ID
const getByIdTipo = new GetByIdTipo();
tipoRouter.get('/tipo:id', getByIdTipo.handle);

// CREATE   
const createTipo = new CreateTipo();
tipoRouter.post('/tipo', createTipo.handle);

// UPDATE
const updateTipo = new UpdateTipo();
tipoRouter.put('/tipo', updateTipo.handle);

// DELETE
const deleteTipo = new DeleteTipo();
tipoRouter.delete('/tipo', deleteTipo.handle);

// EXPORT - ROUTER
export { tipoRouter }

export default Router;
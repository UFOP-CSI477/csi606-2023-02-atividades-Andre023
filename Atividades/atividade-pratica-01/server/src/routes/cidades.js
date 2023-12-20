import { Router } from "express";
import { GetAllCidade } from "../controller/cidades/GetAllCidade.js";
import { GetByIdCidade } from "../controller/cidades/GetByIdCidade.js";
import { CreateCidade } from "../controller/cidades/CreateCidade.js";
import { UpdateCidade } from "../controller/cidades/UpdateCidade.js";
import { DeleteCidade } from "../controller/cidades/DeleteCidade.js";

const cidadeRouter = Router();
 
// GET ALL   
const getAllCidade = new GetAllCidade();
cidadeRouter.get('/cidades', getAllCidade.handle);

// GET BY ID
const getByIdCidade = new GetByIdCidade();
cidadeRouter.get('/cidades/:id', getByIdCidade.handle);

// CREATE   
const createCidade = new CreateCidade();
cidadeRouter.post('/cidades', createCidade.handle);

// UPDATE
const updateCidade = new UpdateCidade();
cidadeRouter.put('/cidades', updateCidade.handle);

// DELETE
const deleteCidade = new DeleteCidade();
cidadeRouter.delete('/cidades', deleteCidade.handle);

// EXPORT - ROUTER
export { cidadeRouter }

export default Router;
import { Router } from "express";
import { CreateDoacoes } from "../controller/doacoes/CreateDoacoes.js";
import { GetAllDoacoes } from "../controller/doacoes/GetAllDoacoes.js";
import { GetByIdDoacoes } from "../controller/doacoes/GetByIdDoacoes.js";
import { UpdateDoacoes } from "../controller/doacoes/UpdateDoacoes.js";
import { DeleteDoacoes } from "../controller/doacoes/DeleteDoacoes.js";

const doacoesRouter = Router();

// GET ALL
const getAllDoacoesController = new GetAllDoacoes();
doacoesRouter.get('/doacoes', getAllDoacoesController.handle);

// GET BY ID
const getByIdDoacoesController = new GetByIdDoacoes();
doacoesRouter.get('/doacoes/:id', getByIdDoacoesController.handle);

// CREATE   
const createDoacoesController = new CreateDoacoes();
doacoesRouter.post('/doacoes', createDoacoesController.handle);

// UPDATE
const updateDoacoesController = new UpdateDoacoes();
doacoesRouter.put('/doacoes', updateDoacoesController.handle);

// DELETE
const deleteDoacoesController = new DeleteDoacoes();
doacoesRouter.delete('/doacoes', deleteDoacoesController.handle);

// EXPORT - ROUTER
export { doacoesRouter };

export default Router;
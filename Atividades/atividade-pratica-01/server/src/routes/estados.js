import { Router } from "express";
import { GetAllEstado } from "../controller/estados/GetAllEstado.js";
import { GetByIdEstado } from "../controller/estados/GetByIdEstado.js";
import { CreateEstado } from "../controller/estados/CreateEstado.js";
import { UpdateEstado } from "../controller/estados/UpdateEstado.js";
import { DeleteEstado } from "../controller/estados/DeleteEstado.js";


const estadoRouter = Router();

// GET ALL
const getAllEstado = new GetAllEstado();
estadoRouter.get('/estados', getAllEstado.handle);

// GET BY ID
const getByIdEstado = new GetByIdEstado();
estadoRouter.get('/estados/:id', getByIdEstado.handle);

// CREATE   
const createEstado = new CreateEstado();
estadoRouter.post('/estados', createEstado.handle);

// UPDATE
const updateEstado = new UpdateEstado();
estadoRouter.put('/estados', updateEstado.handle);

// DELETE
const deleteEstado = new DeleteEstado();
estadoRouter.delete('/estados', deleteEstado.handle);

// EXPORT - ROUTER
export { estadoRouter }

export default Router;
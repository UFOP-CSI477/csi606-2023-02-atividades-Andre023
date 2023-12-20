import { Router } from "express";
import { CreateLocal } from "../controller/local/CreateLocal.js";
import { GetAllLocal } from "../controller/local/GetAllLocal.js";
import { GetByIdLocal } from "../controller/local/GetByIdLocal.js";
import { UpdateLocal } from "../controller/local/UpdateLocal.js";
import { DeleteLocal } from "../controller/local/DeleteLocal.js";

const localRouter = Router();

// GET ALL
const getAllLocalController = new GetAllLocal();
localRouter.get('/local', getAllLocalController.handle);

// GET BY ID
const getByIdLocalController = new GetByIdLocal();
localRouter.get('/local/:id', getByIdLocalController.handle);

// CREATE   
const createLocaisController = new CreateLocal();
localRouter.post('/local', createLocaisController.handle);

// UPDATE
const updateLocalController = new UpdateLocal();
localRouter.put('/local', updateLocalController.handle);

// DELETE
const deleteLocalController = new DeleteLocal();
localRouter.delete('/local', deleteLocalController.handle);

// EXPORT - ROUTER
export { localRouter };

export default Router;
import { Router } from "express";
import { CreatePessoas } from "../controller/pessoas/CreatePessoas.js";
import { GetAllPessoas } from "../controller/pessoas/GetAllPessoas.js";
import { GetByIdPessoas } from "../controller/pessoas/GetByIdPessoas.js";
import { UpdatePessoas } from "../controller/pessoas/UpdatePessoas.js";
import { DeletePessoas } from "../controller/pessoas/DeletePessoas.js";

const pessoasRouter = Router();

// GET ALL
const getAllPessoasController = new GetAllPessoas();
pessoasRouter.get('/pessoas', getAllPessoasController.handle);

// GET BY ID
const getByIdPessoasController = new GetByIdPessoas();
pessoasRouter.get('/pessoas/:id', getByIdPessoasController.handle);

// CREATE   
const createPessoasController = new CreatePessoas();
pessoasRouter.post('/pessoas', createPessoasController.handle);

// UPDATE
const updatePessoasController = new UpdatePessoas();
pessoasRouter.put('/pessoas', updatePessoasController.handle);

// DELETE
const deletePessoasController = new DeletePessoas();
pessoasRouter.delete('/pessoas', deletePessoasController.handle);

// EXPORT - ROUTER
export { pessoasRouter };

export default Router;
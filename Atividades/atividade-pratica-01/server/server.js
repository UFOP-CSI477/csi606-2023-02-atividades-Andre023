import express from 'express';
import { prisma } from "./src/database/client.js";
import { estadoRouter } from "./src/routes/estados.js";
import { cidadeRouter } from "./src/routes/cidades.js";
import { tipoRouter } from "./src/routes/tipo.js";
import { pessoasRouter } from "./src/routes/pessoas.js";
import { localRouter } from "./src/routes/local.js";
import { doacoesRouter } from "./src/routes/doacoes.js";

const server = express();
const PORT = 5000;

// Middleware para analisar o corpo das requisições JSON
server.use(express.json());

// Routes
server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    });
});

server.use(estadoRouter);
server.use(cidadeRouter);
server.use(tipoRouter);
server.use(pessoasRouter);
server.use(localRouter);
server.use(doacoesRouter);

server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`);
});

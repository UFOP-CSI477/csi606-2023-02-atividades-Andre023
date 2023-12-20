import { prisma } from "../../database/client.js";

export class GetByIdTipo {
    async handle(request, response) {
        const { id } = request.body;

        try {
            const tipo = await prisma.tipo.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            return response.json(tipo);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
}
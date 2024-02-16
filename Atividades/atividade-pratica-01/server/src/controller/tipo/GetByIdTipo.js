import { prisma } from "../../database/client.js";

export class GetByIdTipo {
    async handle(request, response) {
        const { id } = request.params;

        try{
            const tipo = await prisma.estado.findUniqueOrThrow ({
                where: {
                    id: parseInt(id)
                }
            });
            return response.json(tipo);
        } catch (error) {
            response.status(404).json({
                message: 'Invalid request.', error
            })
        }
    }
}
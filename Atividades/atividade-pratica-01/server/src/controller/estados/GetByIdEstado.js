import { prisma } from "../../database/client.js";

export class GetByIdEstado {
    async handle(request, response) {
        const { id } = request.params;

        try{
            const estado = await prisma.estado.findUniqueOrThrow ({
                where: {
                    id: parseInt(id)
                }
            });
            return response.json(estado);
        } catch (error) {
            response.status(404).json({
                message: 'Invalid request.', error
            })
        }
    }
}
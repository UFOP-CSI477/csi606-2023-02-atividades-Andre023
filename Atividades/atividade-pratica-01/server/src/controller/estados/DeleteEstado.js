import { prisma } from "../../database/client.js";

export class DeleteEstado {
    async handle(request, response) {
        const { id } = request.body;

        try {
            const estado = await prisma.estado.delete({
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
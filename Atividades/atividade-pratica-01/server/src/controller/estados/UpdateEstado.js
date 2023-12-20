import { prisma } from "../../database/client.js";

export class UpdateEstado {
    async handle(request, response) {
        const {id, nome, sigla } = request.body;

        try {
            const estado = await prisma.estado.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    nome,
                    sigla
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
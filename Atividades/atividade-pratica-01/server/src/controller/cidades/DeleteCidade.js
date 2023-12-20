import { prisma } from '../../database/client.js';

export class DeleteCidade {
    async handle(request, response) {
        const { id } = request.body;
        if (!id || isNaN(parseInt(id))) {
            return response.status(400).json({
                message: 'Invalid ID provided.'
            });
        }
        try {
            const cidade = await prisma.cidade.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return response.json(cidade);
        } catch (error) {
            console.error(error);
            if (error.code === 'P2025') {
                return response.status(404).json({
                    message: 'Cidade not found.'
                });
            } else {
                return response.status(500).json({
                    message: 'Internal server error.'
                });
            }
        }
    }
}

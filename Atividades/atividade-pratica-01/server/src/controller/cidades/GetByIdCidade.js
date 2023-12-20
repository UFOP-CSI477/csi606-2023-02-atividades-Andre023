import { prisma } from '../../database/client.js'

export class GetByIdCidade {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const cidade = await prisma.cidade.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            return response.json(cidade);
        } catch (error) {
            response.status(404).json({
                message: 'Invalid request.', error
            })
        }
    }
}
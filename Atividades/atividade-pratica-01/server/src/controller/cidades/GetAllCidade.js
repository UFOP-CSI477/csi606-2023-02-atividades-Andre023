import { prisma } from '../../database/client.js'

export class GetAllCidade {
    async handle(request, response) {
        try {
            const cidade = await prisma.cidade.findMany();
            return response.json(cidade);
        } catch (error) {
            response.status(404).json({
                message: 'Invalid request.', error
            })
        }
    }
}
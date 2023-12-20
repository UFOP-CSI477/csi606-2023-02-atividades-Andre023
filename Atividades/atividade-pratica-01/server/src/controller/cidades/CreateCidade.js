import { prisma } from '../../database/client.js';

export class CreateCidade {
    async handle(request, response) {
        const { nome, estadoId } = request.body;
        try {
            const cidade = await prisma.cidade.create({
                data: {
                    nome,
                    estado: {
                        connect: {
                            id: estadoId
                        }
                    }
                }
            });
            return response.json(cidade);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
}

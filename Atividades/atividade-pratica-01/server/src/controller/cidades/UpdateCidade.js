import { prisma } from '../../database/client.js';
export class UpdateCidade {
    async handle(request, response) {
        const { id, nome, estadoId } = request.body;
        try {
            const cidade = await prisma.cidade.update({
                where: {
                    id
                },
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
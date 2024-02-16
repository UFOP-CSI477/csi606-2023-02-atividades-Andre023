import { prisma } from "../../database/client.js";

export class UpdateDoacoes {
    async handle(request, response) {
        const { id, data, pessoaId, localId } = request.body;
        if (isNaN(Date.parse(data))) {
            return response.status(400).json({ message: 'Invalid date.' });
        }
        const isoDate = new Date(data).toISOString();
        try {
            const doacoes = await prisma.doacoes.update({
                where: { id: parseInt(id) },
                data: {
                    data: isoDate,
                    pessoa_id: pessoaId, // Atualizado para usar pessoa_id em vez de pessoa
                    local_id: localId,   // Atualizado para usar local_id em vez de local
                }
            });
            return response.json(doacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
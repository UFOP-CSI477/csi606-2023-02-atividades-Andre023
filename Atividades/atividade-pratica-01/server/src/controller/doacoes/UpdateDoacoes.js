import { prisma } from "../../database/client.js";

export class UpdateDoacoes {
    async handle(request, response) {
        const { id, data, pessoa_id, local_id } = request.body;
        const isoDate = new Date(data).toISOString();
        try {
            const doacoes = await prisma.doacoes.update({
                where: { id: parseInt(id) },
                data: {
                    data: isoDate,
                    pessoa_id: parseInt(pessoa_id),
                    local_id: parseInt(local_id),
                }
            });
            return response.json(doacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
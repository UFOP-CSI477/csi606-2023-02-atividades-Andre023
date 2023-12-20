import { prisma } from "../../database/client.js";

export class CreateDoacoes {
    async handle(request, response) {
        const { pessoa_id, local_id, data } = request.body;
        const isoDate = new Date(data).toISOString();
        try {
            const doacao = await prisma.doacoes.create({
                data: {
                    pessoa_id,
                    local_id,
                    data: isoDate
                }
            });
            return response.json(doacao);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}

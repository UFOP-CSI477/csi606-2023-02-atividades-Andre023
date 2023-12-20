import { prisma } from "../../database/client.js";

export class GetByIdDoacoes {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const doacoes = await prisma.doacoes.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return response.json(doacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
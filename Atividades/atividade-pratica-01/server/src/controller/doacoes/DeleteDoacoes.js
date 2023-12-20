import { prisma } from "../../database/client.js";

export class DeleteDoacoes {
    async handle(request, response) {
        const { id } = request.body;
        try {
            const doacoes = await prisma.doacoes.delete({
                where: { id: parseInt(id) }
            });
            return response.json(doacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
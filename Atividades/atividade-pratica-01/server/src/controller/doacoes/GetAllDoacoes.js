import { prisma } from "../../database/client.js";

export class GetAllDoacoes {
    async handle(request, response) {
        try {
            const doacoes = await prisma.doacoes.findMany();
            return response.json(doacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}

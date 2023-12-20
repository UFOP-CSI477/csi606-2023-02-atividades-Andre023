import { prisma } from "../../database/client.js";

export class GetAllPessoas {
    async handle(request, response) {
        try {
            const pessoas = await prisma.pessoas.findMany({
                include: {
                    cidade: true,
                    tipo: true
                }
            });
            return response.json(pessoas);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
import { prisma } from "../../database/client.js";

export class GetAllLocal {
    async handle(request, response) {
        try {
            const locais = await prisma.locais_coleta.findMany();
            return response.json(locais);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}

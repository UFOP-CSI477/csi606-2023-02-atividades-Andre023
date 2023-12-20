import { prisma } from "../../database/client.js";

export class GetByIdLocal {
    async handle(request, response) {
        const { id } = request.params;

        try {
            const local = await prisma.locais_coleta.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return response.json(local);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
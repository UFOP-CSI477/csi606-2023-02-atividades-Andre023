import { prisma } from "../../database/client.js";

export class DeleteLocal {
    async handle(request, response) {
        const { id } = request.body;

        try {
            const local = await prisma.locais_coleta.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return response.json(local);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
import { prisma } from "../../database/client.js";

export class UpdateLocal {
    async handle(request, response) {
        const {id, nome, rua, numero, complemento, cidade_id } = request.body;

        try {
            const local = await prisma.locais_coleta.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    nome,
                    rua,
                    numero,
                    complemento,
                    cidade: { connect: { id: cidade_id } }
                }
            });
            return response.json(local);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
import { prisma } from "../../database/client.js";

export class CreateLocal {
    async handle(request, response) {
        const { nome, rua, numero, complemento, cidadeId } = request.body;

        try {
            const local = await prisma.locais_coleta.create({
                data: {
                    nome,
                    rua,
                    numero,
                    complemento,
                    cidade: { connect: { id: cidadeId } }
                    
                }
            });
            return response.json(local);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}

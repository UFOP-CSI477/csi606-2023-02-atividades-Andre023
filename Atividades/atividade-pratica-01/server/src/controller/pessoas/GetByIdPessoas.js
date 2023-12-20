import { prisma } from "../../database/client.js";

export class GetByIdPessoas {
    async handle(request, response) {
        const { id } = request.params;

        try {
            const pessoa = await prisma.pessoas.findUnique({
                where: { id: Number(id) },
                include: {
                    cidade: true,
                    tipo: true
                }
            });
            return response.json(pessoa);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
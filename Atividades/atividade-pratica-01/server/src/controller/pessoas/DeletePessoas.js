import { prisma } from "../../database/client.js";

export class DeletePessoas {
    async handle(request, response) {
        const { id } = request.body;
        try {
            const pessoa = await prisma.pessoas.delete({
                where: { id: parseInt(id) }
            });
            return response.json(pessoa);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
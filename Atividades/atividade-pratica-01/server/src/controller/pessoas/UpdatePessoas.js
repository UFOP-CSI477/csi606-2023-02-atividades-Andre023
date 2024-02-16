import { prisma } from "../../database/client.js";

export class UpdatePessoas {
    async handle(request, response) {
        const {id, nome, rua, numero, complemento, rg, cidadeId, tipoId } = request.body;
        if (!nome || !rua || !numero || !complemento || !rg || !cidadeId || !tipoId) {
            return response.status(400).json({
                message: 'Invalid data. All fields are required.'
            });
        }
        try {
            const pessoa = await prisma.pessoas.update({
                where: { id: parseInt(id) },
                data: {
                    nome,
                    rua, 
                    numero, 
                    complemento, 
                    rg,
                    cidade: { connect: { id: cidadeId } },
                    tipo: { connect: { id: tipoId } }
                }
            });

            return response.json(pessoa);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
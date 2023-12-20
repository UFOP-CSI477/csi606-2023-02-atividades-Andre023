import { prisma } from "../../database/client.js";

export class CreatePessoas {
    async handle(request, response) {
        const { nome, rua, numero, complemento, rg, cidade_id, tipo_id } = request.body;

        // Verifique se todos os campos estão presentes
        if (!nome || !rua || !numero || !complemento || !rg || !cidade_id || !tipo_id) {
            return response.status(400).json({
                message: 'Invalid data. All fields are required.'
            });
        }

        try {
            const pessoa = await prisma.pessoas.create({
                data: {
                    nome,
                    rua, 
                    numero, 
                    complemento, 
                    rg,
                    cidade: { connect: { id: cidade_id } },
                    tipo: { connect: { id: tipo_id } }
                }
            });

            return response.json(pessoa);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}

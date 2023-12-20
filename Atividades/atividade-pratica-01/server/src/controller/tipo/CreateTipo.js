import { prisma } from "../../database/client.js";

export class CreateTipo {
    async handle(request, response) {
        const { tipo, fator } = request.body;
        if (!tipo || !fator) {
            return response.status(400).json({
                message: 'Invalid data. Tip and fator are required.'
            });
        }
        try {
            const tipos = await prisma.tipos_sanguineos.create({
                data: {
                    tipo,
                    fator
                }
            });
            return response.json(tipos);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
}

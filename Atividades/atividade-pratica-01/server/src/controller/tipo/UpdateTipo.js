import { prisma } from "../../database/client.js";

export class UpdateTipo {
    async handle(request, response) {
        const { id, tipo, fator } = request.body;
        if (tipo === "") {
            return response.status(400).json({
                message: 'Invalid data. Tipo is required.'
            })
        }
        const tipos = await prisma.tipos_sanguineos.update({
            where: {
                id: parseInt(id)
            },
            data: {
                tipo,
                fator
            }
        })
        return response.json(tipos);
    }
}
import { prisma } from "../../database/client.js";

export class DeleteTipo {
    async handle(request, response) {
        const { id } = request.body;

        try{
            const tipos = await prisma.tipos_sanguineos.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return response.json(tipos);
        } catch (error) {
            response.status(404).json({
                message: 'Invalid request.', error
            })
        }
    }
}
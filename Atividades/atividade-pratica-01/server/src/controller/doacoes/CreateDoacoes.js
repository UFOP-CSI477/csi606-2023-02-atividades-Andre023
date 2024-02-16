import { prisma } from '../../database/client.js';

export class CreateDoacoes {
    async handle(request, response) {
        const { pessoaId, localId, datas } = request.body;
        const date = new Date(datas);

        if (isNaN(date.getTime())) {
            return response.status(400).json({ message: 'Invalid date.' });
        }

        const isoDate = date.toISOString();

        try {
            const doacao = await prisma.doacoes.create({
                data: {
                    pessoa_id: pessoaId,
                    local_id: localId,
                    data: isoDate // Alterado de 'datas' para 'data'
                }
            });
            return response.json(doacao);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}

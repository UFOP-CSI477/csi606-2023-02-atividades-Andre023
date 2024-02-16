import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";

export interface LocalInterface {
    id: number;
    nome: string;
    rua: string;
    numero: number;
    complemento: string;
    cidade_id: number;
    created_at: string;
    updated_at: string;
}

interface CidadeInterface {
    id: number;
    nome: string;
}

export const ListCidades = () => {

    const [ locais, setLocais ] = useState<LocalInterface[]>([]);
    const [ cidades, setCidades ] = useState<{ [key: number]: CidadeInterface }>({});

    useEffect(() => {
        api.get('/locais').then(response => {
            setLocais(response.data);
        });

        api.get('/cidades').then(response => {
            const cidadesObj = response.data.reduce((obj: { [key: number]: CidadeInterface }, cidade: CidadeInterface) => {
                obj[cidade.id] = cidade;
                return obj;
            }, {});
            setCidades(cidadesObj);
        });
    }, []);

    
    const handleDeleteLocal = async (id: number) => {
        if(!window.confirm("Deseja realmente excluir este local de coleta?")) {
            return;
        }
        try{
            await api.delete('/locais', {
                data:{
                    id
                }
            });
            alert('Local de coleta excluído com sucesso!');
            setLocais(locais.filter(local => local.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir o local de coleta!');
        }
    }

    return (
        <div>
            <h3>Lista de cidades</h3>
            <div>
                <Link to="/locais/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Rua</th>
                        <th>Número</th>
                        <th>Complemento</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {locais.map(local => (
                        <tr>
                            <td>{local.id}</td>
                            <td>{local.nome}</td>
                            <td>{local.rua}</td>
                            <td>{local.numero}</td>
                            <td>{local.complemento}</td>
                            <td>{cidades[local.cidade_id]?.nome}</td>
                            <td>{local.created_at}</td>
                            <td>{local.updated_at}</td>
                            <td><Link to={`/locais/update/${local.id}`}>Atualizar</Link></td>
                            <td><button onClick={()=>{handleDeleteLocal(local.id)}}>Excluir</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListCidades;
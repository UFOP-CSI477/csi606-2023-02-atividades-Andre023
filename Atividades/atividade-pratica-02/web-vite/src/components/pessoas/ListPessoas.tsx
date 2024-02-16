import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";

export interface PessoaInterface {
    id: number;
    nome: string;
    rua: string;
    numero: number;
    complemento: string;
    rg: string;
    cidade_id: number;
    tipo_id: number;
    created_at: string;
    updated_at: string;
}

interface CidadeInterface {
    id: number;
    nome: string;
}

interface TipoInterface {
    id: number;
    tipo: string;
    fator: string;
}

export const ListPessoas = () => {

    const [ pessoas, setPessoas ] = useState<PessoaInterface[]>([]);
    const [ cidades, setCidades ] = useState<{ [key: number]: CidadeInterface }>({});
    const [ tipos, setTipos ] = useState<{ [key: number]: TipoInterface }>({});
    
    useEffect(() => {
        api.get('/pessoas').then(response => {
            setPessoas(response.data);
        });

        api.get('/cidades').then(response => {
            const cidadesObj = response.data.reduce((obj: { [key: number]: CidadeInterface }, cidade: CidadeInterface) => {
                obj[cidade.id] = cidade;
                return obj;
            }, {});
            setCidades(cidadesObj);
        });

        api.get('/tipos').then(response => {
            const tiposObj = response.data.reduce((obj: { [key: number]: TipoInterface }, tipos: TipoInterface) => {
                obj[tipos.id] = tipos;
                return obj;
            }, {});
            setTipos(tiposObj);
        });
    }, []);

    
    const handleDeletePessoa = async (id: number) => {
        if(!window.confirm("Deseja realmente excluir esta pessoa?")) {
            return;
        }
        try{
            await api.delete('/pessoas', {
                data:{
                    id
                }
            });
            alert('Pessoa excluído com sucesso!');
            setPessoas(pessoas.filter(pessoa => pessoa.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir a pessoa!');
        }
    }

    return (
        <div>
            <h3>Lista de pessoas</h3>
            <div>
                <Link to="/pessoas/create">Inserir</Link>
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
                        <th>RG</th>
                        <th>Cidade</th>
                        <th>Tipo Sanguíneo</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(pessoa => (
                        <tr>
                            <td>{pessoa.id}</td>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.rua}</td>
                            <td>{pessoa.numero}</td>
                            <td>{pessoa.complemento}</td>
                            <td>{pessoa.rg}</td>
                            <td>{cidades[pessoa.cidade_id]?.nome}</td>
                            <td>{tipos[pessoa.tipo_id]?.tipo} - {tipos[pessoa.tipo_id]?.fator}</td>

                            <td>{pessoa.created_at}</td>
                            <td>{pessoa.updated_at}</td>
                            <td><Link to={`/pessoas/update/${pessoa.id}`}>Atualizar</Link></td>
                            <td><button onClick={()=>{handleDeletePessoa(pessoa.id)}}>Excluir</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListPessoas;
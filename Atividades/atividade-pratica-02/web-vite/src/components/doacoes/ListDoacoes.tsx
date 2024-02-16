import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";

export interface DoacaoInterface {
    id: number;
    pessoa_id: number;
    local_id: number;
    data: string;
    created_at: string;
    updated_at: string;
}

interface LocaisInterface {
    id: number;
    nome: string;
}

interface PessoaInterface {
    id: number;
    nome: string;
}


export const ListDoacoes = () => {

    const [ doacoes, setDoacoes ] = useState<DoacaoInterface[]>([]);
    const [ pessoas, setPessoas ] = useState<{ [key: number]: PessoaInterface }>({});
    const [ locais, setLocais ] = useState<{ [key: number]: LocaisInterface }>({});

    useEffect(() => {
        api.get('/doacoes').then(response => {
            setDoacoes(response.data);
        });

        api.get('/pessoas').then(response => {
            const pessoasObj = response.data.reduce((obj: { [key: number]: PessoaInterface }, pessoa: PessoaInterface) => {
                obj[pessoa.id] = pessoa;
                return obj;
            }, {});
            setPessoas(pessoasObj);
        });
        api.get('/locais').then(response => {
            const locaisObj = response.data.reduce((obj: { [key: number]: LocaisInterface }, local: LocaisInterface) => {
                obj[local.id] = local;
                return obj;
            }, {});
            setLocais(locaisObj);
        });
    }, []);

    
    const handleDeleteDoacao = async (id: number) => {
        if(!window.confirm("Deseja realmente excluir esta doação?")) {
            return;
        }
        try{
            await api.delete('/doacoes', {
                data:{
                    id
                }
            });
            alert('Doação excluído com sucesso!');
            setDoacoes(doacoes.filter(doacao => doacao.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir a doação!');
        }
    }

    return (
        <div>
            <h3>Lista de doações</h3>
            <div>
                <Link to="/doacoes/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID da pessoa</th>
                        <th>ID do local</th>
                        <th>Data</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {doacoes.map(doacao => (
                        <tr>
                            <td>{doacao.id}</td>
                            <td>{pessoas[doacao.pessoa_id]?.nome}</td>
                            <td>{locais[doacao.local_id]?.nome}</td>
                            <td>{doacao.data}</td>
                            <td>{doacao.created_at}</td>
                            <td>{doacao.updated_at}</td>
                            <td><Link to={`/doacoes/update/${doacao.id}`}>Atualizar</Link></td>
                            <td><button onClick={()=>{handleDeleteDoacao(doacao.id)}}>Excluir</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListDoacoes;
import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";

export interface TipoInterface {
    id: number;
    tipo: string;
    fator: string;
    created_at: string;
    updated_at: string;
}
const ListTipos = () => {


    const [ tipos, setTipos ] = useState<TipoInterface[]>([]);

    useEffect(() => {
        api.get('/tipos').then(response => {
            setTipos(response.data);
        })
    }, []);

    
    const handleDeleteTipo = async (id: number) => {
        if(!window.confirm("Deseja realmente excluir este tipo sanguíneo?")) {
            return;
        }
        try{
            await api.delete('/tipos', {
                data:{
                    id
                }
            });
            alert('Tipo sanguíneo excluído com sucesso!');
            setTipos(tipos.filter(tipo => tipo.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir o tipo sanguíneo!');
        }
    }

    return (
        <div>
            <h3>Lista de tipos sanguíneos</h3>
            <div>
                <Link to="/tipos/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipo Sanguíneo</th>
                        <th>Fator</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {tipos.map(tipo => (
                        <tr>
                            <td>{tipo.id}</td>
                            <td>{tipo.tipo}</td>
                            <td>{tipo.fator}</td>
                            <td>{tipo.created_at}</td>
                            <td>{tipo.updated_at}</td>
                            <td><Link to={`/tipos/update/${tipo.id}`}>Atualizar</Link></td>
                            <td><button onClick={()=>{handleDeleteTipo(tipo.id)}}>Excluir</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListTipos;
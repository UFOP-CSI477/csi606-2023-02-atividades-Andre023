import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { PessoaInterface } from "../pessoas/ListPessoas";
import { LocalInterface } from "../locais/ListLocais";


const UpdateDoacao = () => {

    const [datas, setData] = useState('');
    const [pessoaId, setPessoaId] = useState(0);
    const [localId, setLocalId] = useState(0);
    const [pessoas, setPessoas] = useState<PessoaInterface[]>([]);
    const [locais, setLocais] = useState<LocalInterface[]>([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api.get('/pessoas').then(response => {
            setPessoas(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('/locais').then(response => {
            setLocais(response.data);
        })
    }, []);

    useEffect(() => {
        api.get(`/doacoes/${id}`).then(response => {
            setData(response.data.nome);
            setPessoaId(response.data.estadoId);
            setLocalId(response.data.estadoId);
        })
    }, [id]);

    const handleUpdateDoacao = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data ={
            id: parseInt(String(id)),
            data: datas,
            pessoaId,
            localId
        };
        try{
            await api.put('/doacoes', data);
            alert('Doação atualizado com sucesso!');
            navigate('/doacoes');
        } catch (error) {
            console.log(error);
            alert('Erro ao atualizar a doação!');
        }
    }
    

    return(
        <div>
            <h3>Atualização de doação: {pessoaId} - {localId} - {datas}</h3>
            <form onSubmit={handleUpdateDoacao}>
                <div>
                    <label htmlFor="data">Data</label>
                    <input type="text" name="data" id="data"  value={datas} onChange={e => setData(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="pessoaId">ID da pessoa</label>
                    <select name="pessoaId" id="pessoaId" onChange={e=> setPessoaId(parseInt(e.target.value))}>
                        <option value="0" selected>Selecione</option>
                        {pessoas.map(pessoa => (
                            <option value={pessoa.id}>{pessoa.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="localId">ID do local</label>
                    <select name="localId" id="localId" onChange={e=> setLocalId(parseInt(e.target.value))}>
                        <option value="0" selected>Selecione</option>
                        {locais.map(local => (
                            <option value={local.id}>{local.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default UpdateDoacao;
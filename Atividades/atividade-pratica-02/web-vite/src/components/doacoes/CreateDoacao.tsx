import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { PessoaInterface } from "../pessoas/ListPessoas";
import { LocalInterface } from "../locais/ListLocais";

const CreateDoacao = () => {

    const [datas, setData] = useState('');
    const [pessoaId, setPessoaId] = useState(0);
    const [localId, setLocalId] = useState(0);
    const [pessoas, setPessoas] = useState<PessoaInterface[]>([]);
    const [locais, setLocais] = useState<LocalInterface[]>([]);

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

    const navigate = useNavigate();
    const handleNewDoacao = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (pessoaId <= 0) {
            alert('Por favor, selecione uma pessoa válida.');
            return;
        }

        if (localId <= 0) {
            alert('Por favor, selecione um local de coleta válido.');
            return;
        }
    
        const data = {
            datas,
            pessoaId,
            localId
        };
    
        try {
            await api.post('/doacoes', data);
            alert('Doação cadastrada com sucesso!');
            navigate('/doacoes');
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar a doação!');
        }
    }

    return(
        <div>
            <h3>Cadastro de doação: {pessoaId} - {localId} - {datas}</h3>
            <form onSubmit={handleNewDoacao}>
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
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateDoacao;
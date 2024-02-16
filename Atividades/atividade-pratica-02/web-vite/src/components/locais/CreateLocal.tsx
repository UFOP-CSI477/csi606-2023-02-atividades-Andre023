import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { CidadeInterface } from "../cidades/ListCidades";

const CreateLocal = () => {

    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidadeId, setCidadeId] = useState(0);
    const [cidades, setCidades] = useState<CidadeInterface[]>([]);

    useEffect(() => {
        api.get('cidades').then(response => {
            setCidades(response.data);
        })
    }, []);

    const navigate = useNavigate();
    const handleNewlocal = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (cidadeId <= 0) {
            alert('Por favor, selecione uma cidade válida.');
            return;
        }
    
        const data = {
            nome,
            rua,
            numero,
            complemento,
            cidade_id: cidadeId
        };
    
        try {
            await api.post('/locais', data);
            alert('Local de coleta cadastrada com sucesso!');
            navigate('/locais');
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar o local de coleta!');
        }
    }

    return(
        <div>
            <h3>Cadastro de local de coleta: {nome} - {rua} - {numero} - {complemento} - {cidadeId}</h3>
            <form onSubmit={handleNewlocal}>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome"  value={nome} onChange={e => setNome(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="rua">Rua</label>
                    <input type="text" name="rua" id="rua"  value={rua} onChange={e => setRua(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="numero">Numero</label>
                    <input type="text" name="numero" id="numero"  value={numero} onChange={e => setNumero(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="complemento">Complemento</label>
                    <input type="text" name="complemento" id="complemento"  value={complemento} onChange={e => setComplemento(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="cidadeId">Cidade</label>
                    <select name="cidadeId" id="cidadeId" onChange={e=> setCidadeId(parseInt(e.target.value))}>
                        <option value="0" selected>Selecione</option>
                        {cidades.map(cidade => (
                            <option value={cidade.id}>{cidade.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateLocal;
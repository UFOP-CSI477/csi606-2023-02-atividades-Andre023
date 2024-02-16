import { useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateEstado = () => {

    const [tipo, setTipo] = useState('');
    const [fator, setFator] = useState('');
    const navigate = useNavigate();

    const handleNewEstado = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data ={
            tipo,
            fator
        };
        try{
            await api.post('/tipos', data);
            alert('Tipo sanguíneo cadastrado com sucesso!');
            navigate('/tipos');
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar o tipo sanguíneo!');
        }
    }

    return(
        <div>
            <h3>Cadastro de estado: {tipo} - {fator}</h3>
            <form onSubmit={handleNewEstado}>
                <div>
                    <label htmlFor="tipo">Tipo sanguíneo</label>
                    <input type="text" name="tipo" id="tipo"  value={tipo} onChange={e => setTipo(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="fator">Fator</label>
                    <input type="text" name="fator" id="fator"  value={fator} onChange={e => setFator(e.target.value)}/>
                </div>
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateEstado;
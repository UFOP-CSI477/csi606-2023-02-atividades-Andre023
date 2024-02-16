import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTipo = () => {

    const [tipo, setTipo] = useState('');
    const [fator, setFator] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api.get(`/tipos/${id}`).then(response => {
            setTipo(response.data.nome);
            setFator(response.data.sigla);
        })
    }, [id]);

    const handleUpdateTipo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data ={
            id: parseInt(String(id)),
            tipo,
            fator
        };
        try{
            await api.put('/tipos', data);
            alert('Tipo sanguíneo atualizado com sucesso!');
            navigate('/tipos');
        } catch (error) {
            console.log(error);
            alert('Erro ao atualizar o tipo sanguíneo!');
        }
    }

    return(
        <div>
            <h3>Atualização de tipo sanguíneo: {tipo} - {fator}</h3>
            <form onSubmit={handleUpdateTipo}>
                <div>
                    <label htmlFor="tipo">Tipo sanguíneo</label>
                    <input type="text" name="tipo" id="tipo"  value={tipo} onChange={e => setTipo(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="fator">Fator</label>
                    <input type="text" name="fator" id="fator"  value={fator} onChange={e => setFator(e.target.value)}/>
                </div>
                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default UpdateTipo;
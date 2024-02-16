import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import ListEstados from "./components/estados/ListEstados";
import CreateEstado from "./components/estados/CreateEstado";
import UpdateEstado from "./components/estados/UpdateEstado";
import CreateCidade from "./components/cidades/CreateCidade";
import ListCidades from "./components/cidades/ListCidades";
import UpdateCidade from "./components/cidades/UpdateCidade";
import ListTipos from "./components/Tipos_sanguineos/ListTipos";
import CreateTipo from "./components/Tipos_sanguineos/CreateTipo";
import UpdateTipo from "./components/Tipos_sanguineos/UpdateTipo";
import ListLocais from "./components/locais/ListLocais";
import CreateLocal from "./components/locais/CreateLocal";
import UpdateLocal from "./components/locais/UpdateLocal";
import ListPessoas from "./components/pessoas/ListPessoas";
import CreatePessoa from "./components/pessoas/CreatePessoa";
import UpdatePessoa from "./components/pessoas/UpdatePessoa";
import ListDoacoes from "./components/doacoes/ListDoacoes";
import CreateDoacao from "./components/doacoes/CreateDoacao";
import UpdateDoacao from "./components/doacoes/UpdateDoacao";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/estados" element={<ListEstados/>} />
                <Route path="/estados/create" element={<CreateEstado/>} />
                <Route path="/estados/update/:id" element={<UpdateEstado/>} />

                <Route path="/cidades" element={<ListCidades/>} />
                <Route path="/cidades/create" element={<CreateCidade/>} />
                <Route path="/cidades/update/:id" element={<UpdateCidade/>} />

                <Route path="/tipos" element={<ListTipos />} />
                <Route path="/tipos/create" element={<CreateTipo />} />
                <Route path="/tipos/update/:id" element={<UpdateTipo/>} />

                <Route path="/locais" element={<ListLocais />} />
                <Route path="/locais/create" element={<CreateLocal/>} />
                <Route path="/locais/update/:id" element={<UpdateLocal/>} />

                <Route path="/pessoas" element={<ListPessoas />} />
                <Route path="/pessoas/create" element={<CreatePessoa/>} />
                <Route path="/pessoas/update/:id" element={<UpdatePessoa/>} />

                <Route path="/doacoes" element={<ListDoacoes />} />
                <Route path="/doacoes/create" element={<CreateDoacao/>} />
                <Route path="/doacoes/update/:id" element={<UpdateDoacao/>} />

            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;
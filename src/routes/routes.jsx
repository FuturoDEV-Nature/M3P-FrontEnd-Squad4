import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import { PrivateRouteLayout } from "../templates/Layout";
import Dashboard from "../pages/Dashboard";
import CadastrarLocais from "../pages/CadastrarLocais";
import GerenciarLocais from "../pages/GerenciarLocais";
import NotFound from "../pages/NotFound";
import { useAuth } from "../context/authContext";

export default function RoutesComponent() {
  const { usuario } = useAuth();

  return (
    <Router>
      <Routes>
        {!usuario ? (
          <>
            <Route path="/" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />} />
          </>   
        ) : (
          <Route path="/" element={<PrivateRouteLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cadastrar-local" element={<CadastrarLocais />} />
            <Route path="gerenciar-locais" element={<GerenciarLocais />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

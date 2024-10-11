import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  usuario: null,
  erroLogin: false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );
  const [erroLogin, setErroLogin] = useState(null);

  async function login({ email, senha }) {
    console.log("Tentando logar com email:", email, "e senha:", senha);
    try {
      const response = await axios.post(
        "https://api-nature-trip-revisao.onrender.com/login",
        {
          email,
          senha,
        }
      );

      console.log("Resposta do servidor:", response);

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log("Token recebido:", token);
        console.log("Usuário recebido:", user);

        // Armazena o token e o usuário no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Atualiza o estado do usuário
        setUsuario(user);
        console.log("Usuário salvo no estado:", usuario);

        // Redireciona para o dashboard
        window.location.href = "/";
      } else {
        console.log("Login falhou com status:", response.status);
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      setErroLogin(true);
    }
  }

  function logout() {
    console.log("Efetuando logout...");
    
    // Remove os dados do localStorage e limpa o estado
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsuario(null);
    window.location.href = "/login";
    
    console.log("Usuário deslogado e redirecionado.");
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, erroLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

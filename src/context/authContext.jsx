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
    try {
      const response = await axios.post(
        "https://api-nature-trip-revisao.onrender.com/login",
        {
          email,
          senha,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Armazena o token e o usuário no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Atualiza o estado do usuário
        setUsuario(user);

        // Redireciona para o dashboard
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Erro na autenticação", error);
      setErroLogin(true);
    }
  }

  function logout() {
    // Remove os dados do localStorage e limpa o estado
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsuario(null);
    window.location.href = "/";
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

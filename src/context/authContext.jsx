import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  usuario: null,
  erroLogin: false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));
  const [erroLogin, setErroLogin] = useState(null);

  async function Login({ email, senha }) {
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password: senha });
      
      const token = response.data.Token;

      if (token) {
        // Aqui você decodifica o payload do JWT para obter os dados do usuário
        const payload = JSON.parse(atob(token.split(".")[1]));
        const user = {
          id: payload.sub,
          email: payload.email,
          nome: payload.name,
        };

        setUsuario(user);
        setErroLogin(false);
        
        // Armazena o token e o usuário no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(user));
      } else {
        setErroLogin(true); 
      }
    } catch (error) {
      console.error("Erro na autenticação", error);
      setErroLogin(true);
    }
  }

  async function Logout() {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token'); // Remover o token também
  }

  return (
    <AuthContext.Provider value={{ usuario, Login, Logout, erroLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  return contexto;
}

import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  usuario: null,
  erroLogin: false,
  login: async () => {},
  Logout: () => {},
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));
  const [erroLogin, setErroLogin] = useState(null);

  async function Login({ email, senha }) {
    try {
      const response = await axios.get("http://localhost:3000/usuarios");

      const user = response.data.find(
        (user) => user.email === email && user.senha === senha
      );

      if (user) {
        setUsuario(user);  
        localStorage.setItem("usuario", JSON.stringify(user));  
        setErroLogin(false);  
      } else {
        setErroLogin(true);  
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErroLogin(true);  
    }
  }

  async function Logout() {
    setUsuario(null);
    localStorage.removeItem('usuario');  
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
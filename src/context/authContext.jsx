import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  usuario: null,
  erroLogin: false,
  login: async () => {},
  LogOut: () => {},
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));
  const [erroLogin, setErroLogin] = useState(null);

  async function Login({ email, senha }) {
    const response = await axios.get("http://localhost:3000/usuarios");
    response.data.map((user) => {
      if (user.email === email && user.senha === senha) {
        setUsuario(user);
        setErroLogin(false);
      } else {
        setErroLogin(true);
      }

      localStorage.setItem("usuario", JSON.stringify(user));
    });
  }

  async function Logout() {
    setUsuario(null);
    localStorage.removeItem('usuario')
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

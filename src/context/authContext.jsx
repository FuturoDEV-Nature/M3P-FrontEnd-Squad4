import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  usuario: null,
  erroLogin: false,
  login: async () => {},
  Logout: () => {},
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );
  const [erroLogin, setErroLogin] = useState(null);

  async function Login({ email, senha}) {
	const {register, handleSubmit, formState: {errors}, reset} = useForm()

    async function validarLogin(dados){
        try {
            const response = await axios.post("https://api-nature-trip-revisao.onrender.com/login", {
                email: dados.email,
                senha: dados.senha
            })

            if(response.status == 200){
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))

                // redirect para o dashboard
                window.location.href = "/"
            }
        }
    // try {
    //   const response = await axios.post(
    //     "https://m3p-backend-squad4-dhih.onrender.com/login",
    //     data
    //   );
	//   const token = req.Authorization
	//   console.log(":::TOKEN:::",token)
    //   const user = response.data.find(
    //     (user) => user.email === email && user.senha === senha
    //   );

    //   if (user) {
    //     setUsuario(user);
    //     setErroLogin(false);
    //     localStorage.setItem("usuario", JSON.stringify(user));
    //   } else {
    //     setErroLogin(true);
    //   }
    catch (error) {
      console.error("Erro na autenticação", error);
      setErroLogin(true);
    }
  }

  async function Logout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ usuario, Login, Logout, erroLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
}
export function useAuth() {
  const contexto = useContext(AuthContext);
  return contexto;
}

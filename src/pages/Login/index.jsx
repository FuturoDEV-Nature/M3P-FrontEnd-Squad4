import { useState } from "react";
import { Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Login() {
  const { Login,  erroLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await Login({ email, senha })
      if (!erroLogin) {
        navigate("/")
      } else {
        setError("Email ou senha incorretos");
      }

      
    } catch (error) {
      console.log("falha no login");
      setError('Erro na autenticação');
    }
  }

  return (
    <div className="min-h-screen bg-green-100 flex  justify-center items-center">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://u-static.fotor.com/images/text-to-image/result/PRO-bd004d0d4a254b22b7013eb3bac0881f.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <div className="flex  justify-center">
              <Leaf size={64} color="lime" />
            </div>
            <h1 className=" text-5xl text-white font-bold"> Cite Natureza</h1>
            <div className=" p-8 rounded  w-80">
              <p className="mb-5 leading-6 text-white text-md">
                Olá aventureiro, seja bem vinda a nossa plataforma de
                compartilhar locais da natureza e experiências em trilhas,
                praias, cachoeiras, parques e outros lugares incríveis.
                Cadastre-se e se encante com o que a natureza tem a oferecer!
              </p>

              <h1 className="text-2xl font-semibold text-center mt-5 mb-6"></h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  <input
                    type="email"
                    className="input input-bordered text-black bg-white"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="input input-bordered text-black bg-white"
                    placeholder="Senha"
                    value={senha}
                    required
                    onChange={(e) => setSenha(e.target.value)}
                  />

                  <span className="text-white">
                    Não tem uma conta?{" "}
                    <Link
                      className="underline underline-offset-4 text-white"
                      to="/cadastro"
                    >
                      Cadastre-se
                    </Link>{" "}
                  </span>
                  {error && (
                    <p className="text-red-500">Email/Senha incorreta</p>
                  )}
                  <button
                    className="btn 200 bg-lime-300 border-lime-300 border-0 text-white w-full rounded-full hover:bg-black hover:text-white active:bg-black active:text-white"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

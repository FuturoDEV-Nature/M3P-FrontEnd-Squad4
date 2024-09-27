import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Login() {
  const { Login, usuario, erroLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await Login({ email, senha });
    } catch (error) {
      console.log("falha no login");
    }
  }
  useEffect(() => {
    if (usuario) {
      navigate("/dashboard");
    }

    if (erroLogin === true) {
      setError(<span>email/senha incorreta</span>);
    }
  }, [usuario, erroLogin]);

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
            <h1 className=" text-5xl text-lime font-bold"> Cite Natureza</h1>
            <div className=" p-8 rounded  w-80">
              <p className="mb-5 leading-6 text-lime text-md">
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
                    className="input input-bordered text-black"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="input input-bordered text-black"
                    placeholder="Senha"
                    value={senha}
                    required
                    onChange={(e) => setSenha(e.target.value)}
                  />

                  <span>
                    Não tem uma conta?{" "}
                    <Link
                      className="underline underline-offset-4"
                      to="/cadastro"
                    >
                      Cadastre-se
                    </Link>{" "}
                  </span>
                  {error && (
                    <p className="text-red-500">Email/Senha incorreta</p>
                  )}
                  <button
                    className="btn text-base-200 bg-lime-300 w-full rounded-full"
                    type="submit"
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

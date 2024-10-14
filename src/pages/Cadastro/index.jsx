import axios from "axios";
import { useForm } from "react-hook-form";
import { addUser } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    addUser(data)
      .then((response) => {
        console.log(response);
        alert("Usuário cadastrado com sucesso");
        navigate("/");
      })
      .catch((error) => {
        alert("Houve um erro ao cadastrar usuário");
        console.log(error.message);
      });
  };

  const cepApi = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        alert("CEP não encontrado");
      } else {
        setValue(
          "endereco",
          `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`
        );
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  return (
    <div className="min-h-screen bg-lime-300 flex flex-col justify-center items-center">
      <div className="flex mt-4 justify-center">
        <Leaf size={64} color="lime" />
      </div>
      <h2 className=" text-2xl text-white font-bold text-center">
        {" "}
        Cite Natureza
      </h2>
      <div className="mt-10 mb-10 bg-white p-8 rounded shadow-md w-3/4">
        <h1 className="text-2xl font-semibold text-center mb-6 text-black ">Cadastre-se</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center gap-10">
            <div className="grow">
              <label className="label text-black">Nome:</label>
              <input
                type="text"
feature/melhorias-gerais-estilos
                className="input input-bordered w-full text-black bg-white"
                {...register("nome", { required: "Nome é obrigatório!" })}

              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}

              <label className="label text-black">Data de nascimento:</label>
              <input
                type="date"
 feature/melhorias-gerais-estilos
                className="input input-bordered w-full text-black bg-white"
                {...register("age", {
                  
                  required: "Data de nascimento é obrigatória!",
                  validate: (value) =>
                    new Date().getFullYear() - new Date(value).getFullYear() >=
                      18 || "Você deve ter no mínimo 18 anos!",
                })}
              />
              {errors.data_nascimento && <p className="text-error">{errors.data_nascimento.message}</p>}

              <label className="label text-black">Sexo:</label>
              <select
                className="select select-bordered w-full text-black bg-white"
                {...register("sexo", { required: "Sexo é obrigatório!" })}
                defaultValue=""
              >
                <option disabled value="">
                  Selecione
                </option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outros">Outros</option>
              </select>
              {errors.sexo && (
                <p className="text-error">{errors.sexo.message}</p>
              )}

              <label className="label text-black">CPF:</label>
              <input
                type="text"
                className="input input-bordered w-full text-black bg-white"
                {...register("cpf", {
                  required: "CPF é obrigatório!",
                  maxLength: {
                    value: 14,
                    message: "CPF deve ter no máximo 14 caracteres",
                  },
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message:
                      "O CPF não está no formato correto Ex: 123.456.789-10",
                  },
                })}
              />
              {errors.cpf && <p className="text-error">{errors.cpf.message}</p>}
            </div>

            <div className="grow">
              <label className="label text-black">CEP:</label>
              <input
                type="text"
                className="input input-bordered w-full text-black bg-white"
                {...register("cep", {
                  required: "O CEP é obrigatório",
                  maxLength: {
                    value: 9,
                    message: "CEP deve ter no máximo 9 caracteres",
                  },
                  pattern: {
                    value: /^\d{5}-\d{3}$/,
                    message: "O CEP não está no formato correto Ex: 12345-678",
                  },
                })}
                onBlur={(e) => cepApi(e.target.value)}
              />
              {errors.cep && <p className="text-error">{errors.cep.message}</p>}

              <label className="label text-black">Endereço:</label>
              <input
                type="text"
                className="input input-bordered w-full text-black bg-white"
                {...register("endereco")}
              />

              <label className="label text-black">Email:</label>
              <input
                type="email"
                className="input input-bordered w-full text-black bg-white"
                {...register("email", { required: "Email é obrigatório!" })}
              />
              {errors.email && (
                <p className="text-error">{errors.email.message}</p>
              )}

              <label className="label text-black">Senha:</label>
              <input
                type="password"
                className="input input-bordered w-full text-black bg-white"
                {...register("senha", { required: "Senha é obrigatória!" })}
              />
              {errors.senha && (
                <p className="text-error">{errors.senha.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-lime-300 w-full rounded-full mt-10 btn 200 bg-lime-300 border-lime-300 border-0 text-white w-full rounded-full hover:bg-black hover:text-white active:bg-black active:text-white"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

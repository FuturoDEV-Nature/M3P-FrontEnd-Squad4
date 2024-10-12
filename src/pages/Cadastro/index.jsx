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
      <h2 className=" text-2xl text-lime font-bold text-center">
        {" "}
        Cite Natureza
      </h2>
      <div className="mt-10 mb-10 bg-white p-8 rounded shadow-md w-3/4">
        <h1 className="text-2xl font-semibold text-center mb-6">Cadastre-se</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center gap-10">
            <div className="grow">
              <label className="label">Nome:</label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("nome", { required: "Nome é obrigatório!" })}
              />
              {errors.name && (
                <p className="text-error">{errors.nome.message}</p>
              )}

              <label className="label">Data de nascimento:</label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register("age", {
                  required: "Data de nascimento é obrigatória!",
                  validate: (value) =>
                    new Date().getFullYear() - new Date(value).getFullYear() >=
                      18 || "Você deve ter no mínimo 18 anos!",
                })}
              />
              {errors.age && <p className="text-error">{errors.age.message}</p>}

              <label className="label">Sexo:</label>
              <select
                className="select select-bordered w-full"
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

              <label className="label">CPF:</label>
              <input
                type="text"
                className="input input-bordered w-full"
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
              <label className="label">CEP:</label>
              <input
                type="text"
                className="input input-bordered w-full"
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

              <label className="label">Endereço:</label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("endereco")}
              />

              <label className="label">Email:</label>
              <input
                type="email"
                className="input input-bordered w-full"
                {...register("email", { required: "Email é obrigatório!" })}
              />
              {errors.email && (
                <p className="text-error">{errors.email.message}</p>
              )}

              <label className="label">Senha:</label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("senha", { required: "Senha é obrigatória!" })}
              />
              {errors.senha && (
                <p className="text-error">{errors.senha.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-lime-300 w-full rounded-full mt-10"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

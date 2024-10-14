import { useForm } from "react-hook-form";
import axios from "axios";
import { addLoccais } from "../../api/endpoints";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

export default function CadastrarLocais() {
  const { userId } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    addLoccais({
      userId: userId.id,
      ...data,
    })
      .then(() => {
        alert("Local cadastrado com sucesso");
        navigate("/gerenciar-locais");
      })
      .catch((error) => {
        alert("Houve um erro ao cadastrar o local", error);
      });
  };

  const cepApi = async (cep) => {
    try {
      const response = await axios.get(
        `https://cep.awesomeapi.com.br/json/${cep}`
      );
      if (response.data.erro) {
        alert("CEP não encontrado");
      } else {
        setValue(
          "localizacao",
          `${response.data.address}, ${response.data.district}, ${response.data.city} - ${response.data.state}`
        ),
          setValue("lat", `${response.data.lat}`),
          setValue("lon", `${response.data.lng}`);
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  return (
    <div>
      <h1 className="text-black p-4 font-sans text-xl font-medium">
        Cadastrar Local de Preservação da Natureza
      </h1>
      <hr></hr>

      <div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Local
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("name", {
                required: "Nome do local é obrigatório",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("descricao", {
                required: "Descrição é obrigatória",
              })}
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descricao.message}
              </p>
            )}
          </div>

          {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            ID Usuário
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("idUsuario", {
              required: "ID do usuário é obrigatório",
            })}
          />
          {errors.idUsuario && (
            <p className="text-red-500 text-sm mt-1">
              {errors.idUsuario.message}
            </p>
          )}
        </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("cep", {
                pattern: {
                  value: /^\d{5}-?\d{3}$/,
                  message:
                    "CEP inválido.",
                },
              })}
              onBlur={(e) => cepApi(e.target.value)}
            />
            {errors.cep && (
              <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Localização
            </label>
            <input
              type="text"
              className="mt-1 block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("localizacao")}
            />
            {errors.localizacao && (
              <p className="text-red-500 text-sm mt-1">
                {errors.localizacao.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("lat")}
            />
            {errors.lat && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lat.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("lon")}
            />
            {errors.lon && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lon.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="btn 200 bg-lime-300 w-full rounded-full"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import axios from "axios";
import { addLocais } from "../../api/endpoints";
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
    addLocais({
      userId,
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
        );
        setValue("latitude", `${response.data.lat}`);
        setValue("longitude", `${response.data.lng}`);
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  return (
    <div className="bg-white">
      <h1 className="text-black p-4 font-sans text-xl font-medium bg-white">
        Cadastrar Local de Preservação da Natureza
      </h1>
      <hr />

      <div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Local
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
              {...register("nomeLocal", {
                required: "Nome do local é obrigatório",
              })}
            />
            {errors.nomeLocal && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nomeLocal.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
              {...register("cep", {
                pattern: {
                  value: /^\d{5}-?\d{3}$/,
                  message: "CEP inválido",
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
              className="mt-1 block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
              {...register("localizacao", {
                required: "Localização é obrigatória",
              })}
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
              {...register("latitude")}
            />
            {errors.latitude && (
              <p className="text-red-500 text-sm mt-1">
                {errors.latitude.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
              {...register("longitude")}
            />
            {errors.longitude && (
              <p className="text-red-500 text-sm mt-1">
                {errors.longitude.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="btn bg-lime-300 border-lime-300 border-0 text-black w-full rounded-full hover:bg-black hover:text-white active:bg-black active:text-white"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

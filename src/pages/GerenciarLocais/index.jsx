import { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getLocais, deleteLocal, atualizarLocal } from "../../api/endpoints";
import { useAuth } from "../../context/authContext";

export default function GerenciarLocais() {
  const [editarLocal, setEditarLocal] = useState(false);
  const [locais, setLocais] = useState([]);
  const [editandoId, setEdtandoId] = useState("");

  const { usuario } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const editForm = (local) => {
    setEditarLocal(!editarLocal);
    setEdtandoId(local.id);
    setValue("name", local.name);
    setValue("descricao", local.descricao);
    setValue("userId", local.userId);
    setValue("cep", local.cep);
    setValue("localizacao", local.localizacao);
    setValue("lat", local.lat);
    setValue("lon", local.lon);
  };

  useEffect(() => {
    getLocais().then((loc) => setLocais(loc));
  }, []);

  const onDelete = (id) => {
    deleteLocal(id).then(() => {
      getLocais().then((loc) => setLocais(loc));
    });

    console.log(`Excluindo local com ID: ${id}`);
  };

  const onUpdate = (id, data) => {
    atualizarLocal(id, data).then(() => {
      getLocais().then((loc) => setLocais(loc));
      setEditarLocal(null);
    });
    console.log(`Atualizando local com ID: ${id}`);
  };

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
    onUpdate(editandoId, data);
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
    <div className="bg-white">
      <h1 className="text-black p-4 font-sans text-xl font-medium bg-white">
        Gerenciar Locais
      </h1>
      <hr></hr>

      <div className="flex flex-col items-center mt-10 bg-white ">
        {editarLocal && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mb-8"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 bg-white">
                Nome do local
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
                {...register("nomeLocal", { required: true })}

              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Descrição do local
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
                {...register("descricao", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                ID Usuário
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
                {...register("idUsuario", { required: true })}

              />
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
                    value: /^\d{5}\d{3}$/,
                    message: "CEP inválido",
                  },
                })}
                onBlur={(e) => cepApi(e.target.value)}
              />
              {errors.cep && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cep.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Localização
              </label>
              <input
                type="text"
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
                {...register("localizacao", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
                {...register("latitude")}

              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
                {...register("longitude")}

              />
            </div>
            <button
              type="submit"
              className="btn bg-lime-300 text-black w-full rounded-full hover:bg-black hover:text-white"
            >
              Salvar
            </button>
          </form>
        )}

        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="table-auto w-full">
            <thead className="bg-neutral-100">
              <tr>
                <th className="text-black px-4 py-2">Nome do local</th>
                <th className="text-black px-4 py-2">Descrição do local</th>
                <th className="text-black px-4 py-2">Usuário</th>
                <th className="text-black px-4 py-2">Localização</th>
                <th className="text-black px-4 py-2">Longitude</th>
                <th className="text-black px-4 py-2">Latitude</th>

                <th className="text-black px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {locais
                .filter((local) => local.idUsuario === usuario.id)
                .map((local) => (
                  <tr key={local.id}>
                    <td className="border text-black px-4 py-2">{local.nomeLocal}</td>
                    <td className="border text-black px-4 py-2">{local.descricao}</td>
                    <td className="border text-black px-4 py-2">{local.idUsuario}</td>
                    <td className="border text-black px-4 py-2">{local.localizacao}</td>
                    <td className="border text-black px-4 py-2">{local.longitude}</td>
                    <td className="border text-black px-4 py-2">{local.latitude}</td>

                    <td className="border text-black px-4 py-2 ">
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-3"
                        onClick={() => editForm(local)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => onDelete(local.id)}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

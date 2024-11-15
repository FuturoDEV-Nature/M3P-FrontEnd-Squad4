import { Users } from "lucide-react";
import { MapPinCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getLocais, getUsers } from "../../api/endpoints";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Dashboard() {
  const [locais, setLocais] = useState([]);
  const [users, setUsers] = useState([]);
  const [qtdLocais, setQtdLocais] = useState(0);
  const [qtdUsuarios, setQtdUsuarios] = useState(0);

  useEffect(() => {
    getLocais()
      .then((loc) => {
        setLocais(loc);
        setQtdLocais(loc.length);

      })
      .catch((err) => console.log(err));

    getUsers()
      .then((urs) => {
        setUsers(urs);

        setQtdUsuarios(urs.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUserName = (idUsuario) => {
    if (users.length) {
      return users.find((user) => user.id === idUsuario)?.nome || "(não achado)";
    }
    return "(não encontrado)";
  };

  const parseCoordinates = (coordinate) => {
    return parseFloat(coordinate.replace(',', '.'));
  };

  console.log(locais); // Mantido o console.log
  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-black bg-white p-4 font-sans text-xl font-medium">
        Dashboard
      </h1>
      <hr />

      <div className="flex justify-evenly mt-10 bg-white">
        <div className="card bg-orange-500 text-black w-96">
          <div className="card-body">
            <h2 className="card-title">Usuários ativos</h2>
            <div className="flex p-5">
              <p className="text-lg font-bold">{qtdUsuarios}</p>
              <Users />
            </div>
          </div>
        </div>

        <div className="card bg-orange-500 text-black w-96">
          <div className="card-body">
            <h2 className="card-title">Locais cadastrados</h2>
            <div className="flex p-5">
              <p className="text-lg font-bold">{qtdLocais}</p>
              <MapPinCheck />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 bg-white">
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="table-auto w-full mb-7">
            <thead className="bg-neutral-100">
              <tr>
                <th className="text-black px-4 py-2">Nome do local</th>
                <th className="text-black px-4 py-2">Descrição do local</th>
                <th className="text-black px-4 py-2">Usuário</th>
                <th className="text-black px-4 py-2">Localização</th>
              </tr>
            </thead>
            <tbody>
              {locais.map((local) => (
                <tr key={local.id}>
                  <td className="border text-black px-4 py-2">{local.nomeLocal}</td>
                  <td className="border text-black px-4 py-2">{local.descricao}</td>
                  <td className="border text-black px-4 py-2">
                    {users.length ? getUserName(local.idUsuario) : "..."}
                  </td>
                  <td className="border text-black px-4 py-2">{local.localizacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ms-40 my-10 bg-white">
        <MapContainer center={[-23.55052, -46.633308]} zoom={5} style={{ height: "300px", width: "80%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locais.map((local) => {
            const latitude = parseCoordinates(local.latitude);
            const longitude = parseCoordinates(local.longitude);
            return (
              <Marker key={local.id} position={[latitude, longitude]}>
                <Popup>
                  <b>{local.nomeLocal}</b><br />
                  {local.descricao}<br />
                  {local.localizacao}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

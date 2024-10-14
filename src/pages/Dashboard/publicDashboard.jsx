import { getLocais } from "../../api/endpoints";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Leaf } from "lucide-react";

export default function PublicDashboard() {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    getLocais().then((loc) => setLocais(loc));
  }, []);

  const parseCoordinates = (coordinate) => {
    return parseFloat(coordinate.replace(',', '.'));
  };

  return (
    <div>
      <nav className="bg-lime-300 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Cite Natureza</h1>
          <Leaf size={64} color="lime" />
          <div>
            <a href="/login" className="text-white px-4 py-2 bg-lime-500 rounded hover:bg-lime-600">Login</a>
            <a href="/cadastro" className="text-white px-4 py-2 bg-green-500 rounded ml-4 hover:bg-green-600">Criar Conta</a>
          </div>
        </div>
      </nav>
      
      <div className="bg-white">
      <section className="bg-lime-100 text-center py-10">
        <h2 className="text-3xl font-bold text-gray-700">Compartilhe a Natureza com o Mundo</h2>
        <p className="text-lg text-gray-600 mt-4">
          No Cite Natureza, você pode contribuir com a preservação ambiental compartilhando locais incríveis 
          de preservação. Cadastre trilhas, parques, cachoeiras, e outros lugares naturais para que mais pessoas 
          possam conhecê-los e preservá-los.
        </p>
      </section>

      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
        {locais.map((local) => (
          <div
            key={local.id}
            className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{local.nomeLocal}</h3>
            <p className="text-gray-600">{local.descricao}</p>
            <p className="text-gray-500 mt-2">{local.localizacao}</p>
          </div>
        ))}
      </div>

      <div className=" ms-40 my-10 bg-white">
        <MapContainer
          center={[-23.55052, -46.633308]}
          zoom={5}
          style={{ height: "300px", width: "80%" }}
        >
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
                  {local.nomeLocal}
                  {local.descricao}<br />
                  {local.localizacao}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
     </div>
    </div>
  );
}

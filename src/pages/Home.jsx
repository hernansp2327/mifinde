import { useState, useContext, useMemo } from "react";
import { EventosContext } from "../context/EventosContext";
import { Link } from "react-router-dom";

function Home() {
  const contexto = useContext(EventosContext);
  const eventos = contexto?.eventos || [];
  const favoritos = contexto?.favoritos || [];
  const toggleFavorito = contexto?.toggleFavorito || (() => {});

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const favoritosSet = useMemo(
    () => new Set(favoritos.map((id) => Number(id))),
    [favoritos]
  );

  const categorias = [
    "Todos",
    "Fiesta",
    "Música",
    "Gastronomía",
    "Tradicionalista",
    "Deportes",
    "Cultura",
    "Motor",
    "Familiar"
  ];

  const imagenFallback = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

  const imagenesPorCategoria = {
    "Música": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    "Gastronomía": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
    "Motor": "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "Familiar": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "Tradicionalista": "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
    "Cultura": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    "Deportes": "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    "Fiesta": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
  };

  const renderImagen = (evento, altura = "h-40") => (
    <div className="relative overflow-hidden">
      <img
        src={
          evento.imagen ||
          imagenesPorCategoria[evento.categoria] ||
          imagenFallback
        }
        alt={evento.titulo}
        className={`w-full ${altura} object-cover transition-transform duration-300 group-hover:scale-105`}
        onError={(e) => { e.target.src = imagenFallback; }}
      />
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
        {evento.categoria}
      </div>
    </div>
  );

  // 🔥 OPTIMIZADO
  const eventosFiltrados = useMemo(() => {
    return eventos
      .filter((evento) => evento.estado === "aprobado")
      .filter((evento) => {
        const texto = busqueda.toLowerCase();

        const coincideBusqueda =
          (evento.titulo || "").toLowerCase().includes(texto) ||
          (evento.ciudad || "").toLowerCase().includes(texto) ||
          (evento.categoria || "").toLowerCase().includes(texto);

        const coincideCategoria =
          categoriaSeleccionada === "Todos" ||
          evento.categoria === categoriaSeleccionada;

        return coincideBusqueda && coincideCategoria;
      })
      .sort((a, b) => {
        const aEsFavorito = favoritosSet.has(Number(a.id));
        const bEsFavorito = favoritosSet.has(Number(b.id));

        if (aEsFavorito === bEsFavorito) return 0;
        return aEsFavorito ? -1 : 1;
      });
  }, [eventos, busqueda, categoriaSeleccionada, favoritosSet]);

  const eventoDestacado = useMemo(
    () => eventosFiltrados.find((e) => e.destacado),
    [eventosFiltrados]
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-black mb-6">Eventos disponibles</h1>

      {/* BUSCADOR */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* CATEGORÍAS */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-4 py-2 rounded-full transition ${
              categoriaSeleccionada === cat
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DESTACADO */}
      {eventoDestacado && (
        <Link to={`/eventos/${eventoDestacado.id}`}>
          <div className="relative rounded-2xl mb-10 shadow-xl overflow-hidden group cursor-pointer">

            <img
              src={eventoDestacado.imagen || imagenFallback}
              className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="text-2xl font-bold">⭐ Evento destacado</h2>
              <h3 className="text-xl">{eventoDestacado.titulo}</h3>
            </div>
          </div>
        </Link>
      )}

      {/* LISTA */}
      {eventosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No se encontraron eventos 😕
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosFiltrados.map((evento) => (
            <Link key={evento.id} to={`/eventos/${evento.id}`}>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group cursor-pointer">

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorito(evento.id);
                  }}
                  className="absolute top-3 right-3 z-10 text-xl"
                  aria-label="Toggle favorito"
                >
                  {favoritosSet.has(Number(evento.id)) ? "❤️" : "🤍"}
                </button>

                {renderImagen(evento)}

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{evento.titulo}</h3>

                  <p className="text-sm text-gray-600">
                    📍 {evento.ciudad}, {evento.provincia}
                  </p>

                  <p className="text-sm text-gray-600">
                    📅 {evento.fechas?.[0]
                      ? new Date(evento.fechas[0]).toLocaleDateString("es-AR")
                      : "Fecha a confirmar"}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
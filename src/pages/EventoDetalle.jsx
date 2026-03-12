import { useParams } from "react-router-dom"
import { useContext } from "react"
import { EventosContext } from "../context/EventosContext"
import { FavoritosContext } from "../context/FavoritosContext"

export default function EventoDetalle() {

  const { id } = useParams()

  const { eventos } = useContext(EventosContext)
  const { favoritos, toggleFavorito } = useContext(FavoritosContext)

  // primero intenta buscar por ID
  let evento = eventos.find(e => Number(e.id) === Number(id))

  // si no encuentra, intenta por posición
  if (!evento) {
    evento = eventos[Number(id)]
  }

  if (!evento) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Evento no encontrado</h2>
        <p>Puede que el evento haya sido eliminado.</p>
      </div>
    )
  }

  const eventoId = Number(evento.id)

  const esFavorito = favoritos.includes(eventoId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Hero Section */}
      <div className="relative">
        {evento.imagen && (
          <img
            src={evento.imagen}
            alt={evento.titulo}
            className="w-full h-96 object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
              {evento.titulo}
            </h1>
            <p className="text-xl drop-shadow-md">
              📍 {evento.ciudad || "Ciudad no especificada"}, {evento.provincia || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 -mt-16 relative z-10">

          {/* Category and Place */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              🏷️ {evento.categoria}
            </span>
            <span className="text-gray-600">
              📌 {evento.lugar}
            </span>
          </div>

          {/* Favorite Button */}
          <div className="mb-8">
            <button
              onClick={() => toggleFavorito(eventoId)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                esFavorito
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {esFavorito
                ? "❤️ Quitar de favoritos"
                : "🤍 Guardar en favoritos"}
            </button>
          </div>

          {/* Dates Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">📅 Fechas del Evento</h2>
            {evento.fechas && evento.fechas.length > 0 ? (
              <div className="space-y-2">
                {evento.fechas.map((f, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg">
                    {f}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Sin fecha especificada</p>
            )}
          </div>

          {/* Description Section */}
          {evento.descripcion && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">📖 Descripción</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-lg leading-relaxed text-gray-700">{evento.descripcion}</p>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
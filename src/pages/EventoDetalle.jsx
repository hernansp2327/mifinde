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
    <div className="p-6 max-w-3xl mx-auto">

      {evento.imagen && (
        <img
          src={evento.imagen}
          alt={evento.titulo}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-3">
        {evento.titulo}
      </h1>

      <p className="text-lg mb-2">
        📍 {evento.ciudad || "Ciudad no especificada"}, {evento.provincia || ""}
      </p>

      <p className="mb-2">
        🏷️ {evento.categoria}
      </p>

      <p className="mb-4">
        📌 {evento.lugar}
      </p>

      {/* BOTON FAVORITOS */}

      <button
        onClick={() => toggleFavorito(eventoId)}
        className={`px-4 py-2 rounded mb-6 ${
          esFavorito
            ? "bg-red-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {esFavorito
          ? "❤️ Quitar de favoritos"
          : "🤍 Guardar en favoritos"}
      </button>

      <div className="mb-6">

        <strong>Fechas:</strong>

        {evento.fechas && evento.fechas.length > 0 ? (
          <ul className="list-disc ml-5">
            {evento.fechas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        ) : (
          <p>Sin fecha</p>
        )}

      </div>

      {evento.descripcion && (
        <div>
          <strong>Descripción:</strong>
          <p className="mt-2 text-lg">{evento.descripcion}</p>
        </div>
      )}

    </div>
  )
}
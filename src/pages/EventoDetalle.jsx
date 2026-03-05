import { useParams } from "react-router-dom"
import { useContext } from "react"
import { EventosContext } from "../context/EventosContext"

export default function EventoDetalle() {

  const { id } = useParams()
  const { eventos } = useContext(EventosContext)

  // primero intenta buscar por ID
  let evento = eventos.find(e => String(e.id) === String(id))

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
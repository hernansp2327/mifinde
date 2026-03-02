import { useParams } from "react-router-dom"
import { useContext } from "react"
import { EventosContext } from "../context/EventosContext"

export default function EventoDetalle() {

  const { id } = useParams()
  const { eventos } = useContext(EventosContext)

  // Comparación blindada por string
  const evento = eventos.find(e => String(e.id) === String(id))

  console.log("ID recibido:", id)
  console.log("Eventos actuales:", eventos)

  if (!evento) {
    return (
      <div>
        <h2>Evento no encontrado</h2>
        <p>Puede que el ID no coincida o el evento haya sido eliminado.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{evento.titulo}</h2>

      <p><strong>Lugar:</strong> {evento.lugar}</p>

      <p><strong>Fechas:</strong></p>

      {evento.fechas && evento.fechas.length > 0 ? (
        <ul>
          {evento.fechas.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      ) : evento.fecha ? (
        <p>{evento.fecha}</p>
      ) : (
        <p>Sin fecha</p>
      )}

      {evento.descripcion && (
        <div style={{ marginTop: "20px" }}>
          <strong>Descripción:</strong>
          <p>{evento.descripcion}</p>
        </div>
      )}
    </div>
  )
}
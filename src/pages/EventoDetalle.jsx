import { useParams } from "react-router-dom"
import { eventos } from "../data/eventos"

export default function EventoDetalle() {

  const { id } = useParams()

  const evento = eventos.find(e => e.id === Number(id))

  if (!evento) {
    return <p>Evento no encontrado</p>
  }

  return (
    <div>
      <h2>{evento.titulo}</h2>
      <p><strong>Lugar:</strong> {evento.lugar}</p>
      <p><strong>Fecha:</strong> {evento.fecha}</p>
      <p>{evento.descripcion}</p>
    </div>
  )
}
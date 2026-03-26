import { useContext } from "react"
import { FavoritosContext } from "../../mifinde-new/src/context/FavoritosContext"
import { eventos } from "../../mifinde-new/src/data/eventos"
import { Link } from "react-router-dom"

export default function MisEventos() {

  const { favoritos } = useContext(FavoritosContext)

  const eventosGuardados = eventos.filter(e =>
    favoritos.includes(e.id)
  )

  return (
    <div>
      <h2>Mis Eventos Guardados</h2>

      {eventosGuardados.length === 0 && (
        <p>No tenés eventos guardados todavía.</p>
      )}

      {eventosGuardados.map(evento => (
        <div key={evento.id} style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "15px"
        }}>
          <h3>{evento.titulo}</h3>
          <p>{evento.lugar}</p>
          <p>
            {new Date(evento.fecha).toLocaleDateString("es-AR")}
          </p>

          <Link to={`/eventos/${evento.id}`}>
            Ver detalle
          </Link>
        </div>
      ))}

    </div>
  )
}
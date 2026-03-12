import { useContext } from "react"
import { EventosContext } from "../context/EventosContext"

function Eventos() {

  const { eventos } = useContext(EventosContext)

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h2>Eventos</h2>

      {eventos.map((evento) => {

        let fechaTexto = "Fecha a confirmar"

        if (evento.fecha) {
          fechaTexto = evento.fecha
        }

        if (evento.fechas && evento.fechas.length > 0) {
          fechaTexto = evento.fechas[0]
        }

        return (
          <div
            key={evento.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px"
            }}
          >

            {evento.imagen && (
  <img
    src={evento.imagen}
    onError={(e) => (e.target.style.display = "none")}
              
          
                alt={evento.titulo}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              />
            )}

            <img
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
              alt={evento.titulo}
              className="w-full h-32 object-cover rounded-md mb-3"
            />

            <h3>{evento.titulo}</h3>

            <p>📍 {evento.lugar}</p>

            <p>🏷 {evento.categoria}</p>

            <p>📅 {fechaTexto}</p>

          </div>
        )
      })}

    </div>
  )
}

export default Eventos
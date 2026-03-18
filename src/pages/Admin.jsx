import { useContext } from "react"
import { EventosContext } from "../context/EventosContext"

export default function Admin() {

  const {
    eventos,
    deleteEvent,
    toggleFeatured,
    approveEvent,
    rejectEvent
  } = useContext(EventosContext)

  const pendientes = eventos.filter(e => e.estado === "pendiente")
  const aprobados = eventos.filter(e => e.estado === "aprobado")
  const rechazados = eventos.filter(e => e.estado === "rechazado")

  const renderFechas = (evento) => {
    // Compatibilidad con eventos viejos (fecha única)
    if (evento.fechas && evento.fechas.length > 0) {
      return (
        <ul>
          {evento.fechas.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )
    }

    if (evento.fecha) {
      return <p>{evento.fecha}</p>
    }

    return <p>Sin fecha</p>
  }

  const renderEvento = (evento) => (
    <div
      key={evento.id}
      className="hover:shadow-lg"
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        background:
          evento.estado === "pendiente"
            ? "#fff8e6"
            : evento.estado === "rechazado"
            ? "#ffe6e6"
            : "#ffffff"
      }}
    >
      <h3>{evento.titulo}</h3>

      <p><strong>Estado:</strong> {evento.estado}</p>

      <p><strong>Fechas:</strong></p>
      {renderFechas(evento)}

      <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>

        {evento.estado === "pendiente" && (
          <>
            <button
              onClick={() => approveEvent(evento.id)}
              style={{
                padding: "6px 10px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Aprobar
            </button>

            <button
              onClick={() => rejectEvent(evento.id)}
              style={{
                padding: "6px 10px",
                background: "orange",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Rechazar
            </button>
          </>
        )}

        {evento.estado === "aprobado" && (
          <button
            onClick={() => toggleFeatured(evento.id)}
            style={{
              padding: "6px 10px",
              background: "#ff7a00",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {evento.destacado ? "Quitar Destacado" : "Destacar"}
          </button>
        )}

        <button
          onClick={() => deleteEvent(evento.id)}
          style={{
            padding: "6px 10px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Eliminar
        </button>

      </div>
    </div>
  )

  return (
    <div>

      <h2>Panel de Administración</h2>

      <h3 style={{ marginTop: "30px" }}>
        🟡 Pendientes ({pendientes.length})
      </h3>
      {pendientes.length === 0 ? (
        <p>No hay eventos pendientes.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {pendientes.map(renderEvento)}
        </div>
      )}

      <h3 style={{ marginTop: "30px" }}>
        🟢 Aprobados ({aprobados.length})
      </h3>
      {aprobados.length === 0 ? (
        <p>No hay eventos aprobados.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {aprobados.map(renderEvento)}
        </div>
      )}

      <h3 style={{ marginTop: "30px" }}>
        🔴 Rechazados ({rechazados.length})
      </h3>
      {rechazados.length === 0 && <p>No hay eventos rechazados.</p>}
      {rechazados.map(renderEvento)}

    </div>
  )
}
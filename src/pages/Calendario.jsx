import { useState, useContext, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { EventosContext } from "../context/EventosContext"

// 🔥 Normaliza fecha (elimina hora)
const normalizarFecha = (fecha) => {
  const d = new Date(fecha)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function Calendario() {
  const { eventos } = useContext(EventosContext)
  const eventosRef = useRef(null)

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    normalizarFecha(new Date())
  )

  useEffect(() => {
    if (eventosRef.current) {
      eventosRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [fechaSeleccionada])

  // 🔥 Set de fechas con eventos
  const fechasConEventos = new Set(
    (eventos || [])
      .flatMap((evento) =>
        Array.isArray(evento.fechas) ? evento.fechas : []
      )
      .map((fecha) => normalizarFecha(fecha).toDateString())
  )

  // 🔥 Eventos del día seleccionado
  const eventosDelDia = (eventos || []).filter((evento) => {
    if (!evento.fechas || !Array.isArray(evento.fechas)) return false

    return evento.fechas.some(
      (fecha) =>
        normalizarFecha(fecha).toDateString() ===
        normalizarFecha(fechaSeleccionada).toDateString()
    )
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Calendario</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md flex justify-center mb-6">
        <Calendar
          onChange={(value) => {
            const fecha = Array.isArray(value) ? value[0] : value
            setFechaSeleccionada(normalizarFecha(fecha))
          }}
          value={fechaSeleccionada}
          className="w-full max-w-3xl"
          tileClassName={({ date, view }) => {
            if (view !== "month") return ""

            const hoy = normalizarFecha(new Date())
            const fecha = normalizarFecha(date)
            const seleccionada = normalizarFecha(fechaSeleccionada)

            const esHoy = fecha.toDateString() === hoy.toDateString()
            const esSeleccionada =
              fecha.toDateString() === seleccionada.toDateString()
            const tieneEventos = fechasConEventos.has(
              fecha.toDateString()
            )

            return [
              "text-lg",
              "p-2",
              "rounded-lg",
              "hover:bg-orange-100",
              "transition",
              "duration-150",
              esHoy ? "border border-orange-400" : "",
              esSeleccionada
                ? "bg-orange-500 text-white"
                : tieneEventos
                ? "bg-orange-100"
                : "",
            ]
              .filter(Boolean)
              .join(" ")
          }}
          tileContent={({ date, view }) =>
            view === "month" &&
            fechasConEventos.has(
              normalizarFecha(date).toDateString()
            ) ? (
              <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto mt-1" />
            ) : null
          }
        />
      </div>

      <div ref={eventosRef} className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Eventos para el{" "}
          {fechaSeleccionada.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h2>

        {eventosDelDia.length === 0 ? (
          <p className="text-gray-600">
            No hay eventos para esta fecha.
          </p>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {eventosDelDia.map((evento) => (
              <div
                key={evento.id}
                className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition"
              >
                <Link to={`/eventos/${evento.id}`}>
                  <h3 className="text-xl font-bold mb-1">
                    {evento.titulo}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">
                  {evento.ciudad}, {evento.provincia}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
import { createContext, useState, useEffect } from "react"
import { eventos as eventosMock } from "../data/eventos"

export const EventosContext = createContext()

export function EventosProvider({ children }) {

  const [eventos, setEventos] = useState(() => {
    const guardados = localStorage.getItem("eventos")

    if (guardados) {
      return JSON.parse(guardados).map(e => ({
        ...e,
        id: Number(e.id),
        destacado: e.destacado || false,
        estado: e.estado || "aprobado"
      }))
    }

    return eventosMock.map(e => ({
      ...e,
      id: Number(e.id),
      destacado: e.destacado || false,
      estado: e.estado || "aprobado"
    }))
  })

  useEffect(() => {
    localStorage.setItem("eventos", JSON.stringify(eventos))
  }, [eventos])

  const agregarEvento = (nuevoEvento) => {
    setEventos(prev => {
      const maxId = prev.length > 0
        ? Math.max(...prev.map(e => Number(e.id)))
        : 0

      const nuevoId = maxId + 1

      return [
        ...prev,
        {
          ...nuevoEvento,
          id: nuevoId,
          destacado: false,
          estado: "pendiente"
        }
      ]
    })
  }

  const deleteEvent = (id) => {
    setEventos(prev =>
      prev.filter(e => Number(e.id) !== Number(id))
    )
  }

  const toggleFeatured = (id) => {
    setEventos(prev =>
      prev.map(e =>
        Number(e.id) === Number(id)
          ? { ...e, destacado: !e.destacado }
          : e
      )
    )
  }

  const approveEvent = (id) => {
    setEventos(prev =>
      prev.map(e =>
        Number(e.id) === Number(id)
          ? { ...e, estado: "aprobado" }
          : e
      )
    )
  }

  const rejectEvent = (id) => {
    setEventos(prev =>
      prev.map(e =>
        Number(e.id) === Number(id)
          ? { ...e, estado: "rechazado" }
          : e
      )
    )
  }

  return (
    <EventosContext.Provider
      value={{
        eventos,
        agregarEvento,
        deleteEvent,
        toggleFeatured,
        approveEvent,
        rejectEvent
      }}
    >
      {children}
    </EventosContext.Provider>
  )
}
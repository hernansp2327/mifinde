import { createContext, useState, useEffect } from "react"
import { eventos as eventosMock } from "../data/eventos"

export const EventosContext = createContext()

export function EventosProvider({ children }) {

  const [eventos, setEventos] = useState(() => {
    const guardados = localStorage.getItem("eventos")
    if (guardados) {
      return JSON.parse(guardados)
    }

    return eventosMock.map(e => ({
      ...e,
      destacado: e.destacado || false,
      estado: e.estado || "aprobado"
    }))
  })

  useEffect(() => {
    localStorage.setItem("eventos", JSON.stringify(eventos))
  }, [eventos])

  const agregarEvento = (nuevoEvento) => {
    setEventos(prev => {
      const nuevoId = prev.length > 0
        ? Math.max(...prev.map(e => Number(e.id))) + 1
        : 1

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
    setEventos(prev => prev.filter(e => e.id !== id))
  }

  const toggleFeatured = (id) => {
    setEventos(prev =>
      prev.map(e =>
        e.id === id ? { ...e, destacado: !e.destacado } : e
      )
    )
  }

  const approveEvent = (id) => {
    setEventos(prev =>
      prev.map(e =>
        e.id === id ? { ...e, estado: "aprobado" } : e
      )
    )
  }

  const rejectEvent = (id) => {
    setEventos(prev =>
      prev.map(e =>
        e.id === id ? { ...e, estado: "rechazado" } : e
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
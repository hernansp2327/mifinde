import { createContext, useState } from "react"
import { eventos as eventosMock } from "../data/eventos"

export const EventosContext = createContext()

export function EventosProvider({ children }) {

  const [eventos, setEventos] = useState(eventosMock)

  const agregarEvento = (nuevoEvento) => {
    setEventos(prev => {
      const nuevoId = prev.length > 0
        ? Math.max(...prev.map(e => Number(e.id))) + 1
        : 1

      return [
        ...prev,
        {
          ...nuevoEvento,
          id: nuevoId
        }
      ]
    })
  }

  return (
    <EventosContext.Provider value={{ eventos, agregarEvento }}>
      {children}
    </EventosContext.Provider>
  )
}
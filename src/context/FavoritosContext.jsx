import { createContext, useState } from "react"

export const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {

  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("favoritos")
    return guardados ? JSON.parse(guardados).map(Number) : []
  })

  const toggleFavorito = (eventoId) => {
    const id = Number(eventoId)

    setFavoritos(prev => {
      let nuevos

      if (prev.includes(id)) {
        nuevos = prev.filter(favId => favId !== id)
      } else {
        nuevos = [...prev, id]
      }

      localStorage.setItem("favoritos", JSON.stringify(nuevos))
      return nuevos
    })
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}
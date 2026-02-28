import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({ children }) {

  // Simulamos usuario logueado
  const [usuario, setUsuario] = useState({
    nombre: "Hernán",
    rol: "organizador" // cambiar a "usuario" para probar
  })

  const cambiarRol = (nuevoRol) => {
    setUsuario(prev => ({ ...prev, rol: nuevoRol }))
  }

  return (
    <UserContext.Provider value={{ usuario, cambiarRol }}>
      {children}
    </UserContext.Provider>
  )
}
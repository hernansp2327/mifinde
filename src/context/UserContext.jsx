import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({ children }) {

  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario")
    return guardado ? JSON.parse(guardado) : null
  })

  const cambiarRol = (nuevoRol) => {

    const actualizado = { ...usuario, rol: nuevoRol }

    setUsuario(actualizado)

    localStorage.setItem("usuario", JSON.stringify(actualizado))
  }

  const solicitarOrganizador = () => {

    const actualizado = { ...usuario, solicitudOrganizador: true }

    setUsuario(actualizado)

    localStorage.setItem("usuario", JSON.stringify(actualizado))
  }

  const logout = () => {

    setUsuario(null)

    localStorage.removeItem("usuario")
  }

  return (
    <UserContext.Provider value={{
      usuario,
      setUsuario,
      cambiarRol,
      solicitarOrganizador,
      logout
    }}>
      {children}
    </UserContext.Provider>
  )
}
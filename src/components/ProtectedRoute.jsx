import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export default function ProtectedRoute({ children, requiredRole }) {

  const { usuario } = useContext(UserContext)

  if (!usuario || usuario.rol !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}
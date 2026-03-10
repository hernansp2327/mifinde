import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export default function ProtectedRoute({ children, requiredRole }) {

  const { usuario } = useContext(UserContext)

  // si no hay usuario → ir al login
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // si la ruta requiere rol específico
  if (requiredRole && usuario.rol !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}
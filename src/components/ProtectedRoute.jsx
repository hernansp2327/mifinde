import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function ProtectedRoute({ children, requiredRole }) {

  const { user, rol, loading } = useContext(AuthContext)

  // ⏳ Esperar a Firebase
  if (loading) {
    return <p>Cargando...</p>
  }

  // 🔐 No logueado
  if (!user) {
    return <Navigate to="/login" />
  }

  // 🚫 Sin permisos
  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/" />
  }

  return children
}
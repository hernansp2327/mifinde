import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function ProtectedRoute({ children, requiredRole }) {

  const auth = useContext(AuthContext) || {}

  const user = auth.user || null
  const rol = auth.rol || null
  const loading = auth.loading || false

  // ⏳ Esperar a Firebase (evita render roto)
  if (loading) {
    return <p>Cargando...</p>
  }

  // 🔐 No logueado
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 🚫 Sin permisos
  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/" replace />
  }

  // ✅ Render seguro
  return children ? children : null
}
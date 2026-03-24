import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function ProtectedRoute({ children, requiredRole }) {

  const { user, rol } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/" />
  }

  return children
}
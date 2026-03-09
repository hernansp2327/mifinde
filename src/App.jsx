import logo from "./assets/logo.png"
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import { useContext } from "react"

import { FavoritosContext, FavoritosProvider } from "./context/FavoritosContext"
import { UserContext, UserProvider } from "./context/UserContext"
import { EventosProvider } from "./context/EventosContext"

import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home"
import Eventos from "./pages/Eventos"
import EventoDetalle from "./pages/EventoDetalle"
import MisEventos from "./pages/MisEventos"
import CrearEvento from "./pages/CrearEvento"
import Admin from "./pages/Admin"
import Login from "./pages/Login"

function AppContent() {

  const { favoritos } = useContext(FavoritosContext)
  const { usuario } = useContext(UserContext)

  // Si no hay usuario, mandarlo al login
  if (!usuario) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    )
  }

  const puedeCrearEvento =
    usuario.rol === "admin" || usuario.rol === "organizador"

  return (
    <BrowserRouter>

      <div className="min-h-screen flex flex-col bg-gray-50">

        {/* NAVBAR */}
        <nav className="bg-white shadow-md border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="MiFinde Logo" className="h-10" />
              <span className="text-2xl font-bold text-orange-500">
                MiFinde
              </span>
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium">

              <Link to="/" className="text-gray-700 hover:text-orange-500 transition">
                Inicio
              </Link>

              <Link to="/eventos" className="text-gray-700 hover:text-orange-500 transition">
                Eventos
              </Link>

              {puedeCrearEvento && (
                <Link
                  to="/crear-evento"
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Crear Evento
                </Link>
              )}

              <Link
                to="/mis-eventos"
                className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
              >
                ❤️ {favoritos.length}
              </Link>

              {usuario.rol === "admin" && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Admin
                </Link>
              )}

              <div className="text-xs text-gray-500 border-l pl-4">
                {usuario.nombre} ({usuario.rol})
              </div>

            </div>
          </div>
        </nav>

        {/* CONTENIDO */}
        <div className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/eventos" element={<Eventos />} />

            <Route path="/eventos/:id" element={<EventoDetalle />} />

            <Route path="/mis-eventos" element={<MisEventos />} />

            <Route
              path="/crear-evento"
              element={
                puedeCrearEvento
                  ? <CrearEvento />
                  : <Navigate to="/" />
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  )
}

export default function App() {
  return (
    <UserProvider>
      <EventosProvider>
        <FavoritosProvider>
          <AppContent />
        </FavoritosProvider>
      </EventosProvider>
    </UserProvider>
  )
}
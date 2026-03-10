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
import Registro from "./pages/Registro"
import Favoritos from "./pages/Favoritos"

function AppContent() {

  const favoritosContext = useContext(FavoritosContext)
  const userContext = useContext(UserContext)

  const favoritos = favoritosContext?.favoritos || []
  const usuario = userContext?.usuario

  const puedeCrearEvento =
    usuario && (usuario.rol === "admin" || usuario.rol === "organizador")

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

              {/* CONTADOR FAVORITOS */}
              <Link
                to="/favoritos"
                className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
              >
                ❤️ {favoritos.length}
              </Link>

              {puedeCrearEvento && (
                <Link
                  to="/crear-evento"
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Crear Evento
                </Link>
              )}

              {usuario?.rol === "admin" && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Administración
                </Link>
              )}

              {usuario ? (

                <div className="relative group text-xs text-gray-500 border-l pl-4">

                  <span className="cursor-pointer">
                    {usuario.nombre} ({usuario.rol})
                  </span>

                  {/* SOLICITAR ORGANIZADOR */}

                  {usuario.rol === "user" && !usuario.solicitudOrganizador && (
                    <button
                      onClick={() => {

                        const actualizado = {
                          ...usuario,
                          solicitudOrganizador: true
                        }

                        localStorage.setItem(
                          "usuario",
                          JSON.stringify(actualizado)
                        )

                        window.location.reload()
                      }}
                      className="ml-3 text-orange-500 underline text-xs"
                    >
                      Quiero ser organizador
                    </button>
                  )}

                  {usuario.solicitudOrganizador && usuario.rol === "user" && (
                    <span className="ml-3 text-gray-400 text-xs">
                      Solicitud enviada
                    </span>
                  )}

                  {/* MENU USUARIO */}

                  <div className="absolute right-0 top-full pt-2 hidden group-hover:block">

                    <div className="bg-white border shadow-md rounded w-36">

                      <button
                        onClick={() => {
                          localStorage.removeItem("usuario")
                          window.location.reload()
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="flex gap-4">

                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-orange-500 transition"
                  >
                    Iniciar sesión
                  </Link>

                  <Link
                    to="/registro"
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
                  >
                    Crear cuenta
                  </Link>

                </div>

              )}

            </div>
          </div>
        </nav>

        {/* CONTENIDO */}

        <div className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/eventos" element={<Eventos />} />

            <Route path="/eventos/:id" element={<EventoDetalle />} />

            <Route
              path="/mis-eventos"
              element={
                <ProtectedRoute>
                  <MisEventos />
                </ProtectedRoute>
              }
            />

            <Route path="/favoritos" element={<Favoritos />} />

            <Route
              path="/crear-evento"
              element={
                puedeCrearEvento
                  ? <CrearEvento />
                  : <Navigate to="/login" />
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

            <Route path="/registro" element={<Registro />} />

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
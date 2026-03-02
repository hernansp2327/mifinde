import logo from "./assets/logo.png"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
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

function AppContent() {

  const { favoritos } = useContext(FavoritosContext)
  const { usuario } = useContext(UserContext)

  const puedeCrearEvento =
    usuario.rol === "admin" || usuario.rol === "organizador"

  return (
    <BrowserRouter>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial"
      }}>

        <nav style={{
          background: "#ff7a00",
          padding: "20px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <img 
              src={logo} 
              alt="MiFinde Logo" 
              style={{ height: "60px", marginRight: "15px" }} 
            />
            <h1 style={{ color: "white", margin: 0 }}>MiFinde</h1>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Inicio
            </Link>

            <Link to="/eventos" style={{ color: "white", textDecoration: "none" }}>
              Eventos
            </Link>

            {puedeCrearEvento && (
              <Link 
                to="/crear-evento"
                style={{ color: "white", textDecoration: "none" }}
              >
                Crear Evento
              </Link>
            )}

            <Link 
              to="/mis-eventos" 
              style={{ 
                color: "white", 
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              ❤️ {favoritos.length}
            </Link>

            {usuario.rol === "admin" && (
              <Link 
                to="/admin"
                style={{ color: "white", textDecoration: "none" }}
              >
                Admin
              </Link>
            )}

            <span style={{ color: "white", fontSize: "14px" }}>
              {usuario.nombre} ({usuario.rol})
            </span>
          </div>

        </nav>

        <div style={{ padding: "40px", flex: 1 }}>
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
                  : <Home />
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
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { EventosContext } from "../context/EventosContext"
import { FavoritosContext } from "../context/FavoritosContext"

function Eventos() {

  const { eventos } = useContext(EventosContext)
  const { favoritos, toggleFavorito } = useContext(FavoritosContext)

  const [filtroFecha, setFiltroFecha] = useState("todos")
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("todas")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")

  const hoy = new Date()
  const hoyISO = hoy.toISOString().split("T")[0]

  // 🔐 SOLO eventos aprobados visibles al público
  const eventosAprobados = eventos.filter(e => e.estado === "aprobado")

  const ciudades = [...new Set(eventosAprobados.map(e => e.lugar))]
  const categorias = [...new Set(eventosAprobados.map(e => e.categoria))]

  const eventosFiltrados = eventosAprobados.filter(evento => {
    const fechaEvento = new Date(evento.fecha)

    if (filtroFecha === "hoy" && evento.fecha !== hoyISO) return false

    if (filtroFecha === "7dias") {
      const en7Dias = new Date()
      en7Dias.setDate(hoy.getDate() + 7)
      if (!(fechaEvento >= hoy && fechaEvento <= en7Dias)) return false
    }

    if (filtroFecha === "mes") {
      if (
        fechaEvento.getMonth() !== hoy.getMonth() ||
        fechaEvento.getFullYear() !== hoy.getFullYear()
      ) return false
    }

    if (filtroFecha === "finde") {
      const dia = fechaEvento.getDay()
      if (!(dia === 5 || dia === 6 || dia === 0)) return false
    }

    if (ciudadSeleccionada !== "todas" && evento.lugar !== ciudadSeleccionada)
      return false

    if (categoriaSeleccionada !== "todas" && evento.categoria !== categoriaSeleccionada)
      return false

    return true
  })

  // ⭐ Destacados arriba
  const eventosOrdenados = [...eventosFiltrados].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1
    if (!a.destacado && b.destacado) return 1
    return 0
  })

  return (
    <div>

      <h2 style={{ marginBottom: "20px" }}>
        Eventos ({eventosOrdenados.length})
      </h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["todos", "hoy", "finde", "7dias", "mes"].map(opcion => (
          <button
            key={opcion}
            onClick={() => setFiltroFecha(opcion)}
            style={{
              padding: "8px 15px",
              background: filtroFecha === opcion ? "#ff7a00" : "#eee",
              color: filtroFecha === opcion ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {opcion === "todos" && "Todos"}
            {opcion === "hoy" && "Hoy"}
            {opcion === "finde" && "Este Finde"}
            {opcion === "7dias" && "Próx. 7 días"}
            {opcion === "mes" && "Este mes"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        <select
          value={ciudadSeleccionada}
          onChange={(e) => setCiudadSeleccionada(e.target.value)}
        >
          <option value="todas">Todas las ciudades</option>
          {ciudades.map(ciudad => (
            <option key={ciudad} value={ciudad}>{ciudad}</option>
          ))}
        </select>

        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {eventosOrdenados.map(evento => {
        const idNumerico = Number(evento.id)
        const esFavorito = favoritos.includes(idNumerico)

        return (
          <div
            key={evento.id}
            style={{
              border: evento.destacado ? "2px solid #ff7a00" : "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: evento.destacado ? "#fff3e6" : "#fafafa"
            }}
          >
            <h3>
              {evento.destacado && "⭐ "}
              {evento.titulo}
            </h3>

            <p><strong>Lugar:</strong> {evento.lugar}</p>
            <p><strong>Fecha:</strong> {evento.fecha}</p>
            <p><strong>Categoría:</strong> {evento.categoria}</p>

            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <Link to={`/eventos/${evento.id}`}>
                Ver detalle
              </Link>

              <button
                onClick={() => toggleFavorito(idNumerico)}
                style={{
                  background: esFavorito ? "red" : "#ccc",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                {esFavorito ? "Quitar ❤️" : "Favorito 🤍"}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Eventos
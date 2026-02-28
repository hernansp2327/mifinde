import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { eventos as eventosMock } from "../data/eventos"
import { FavoritosContext } from "../context/FavoritosContext"

function Eventos() {

  const { favoritos, toggleFavorito } = useContext(FavoritosContext)

  const [eventos, setEventos] = useState([])
  const [filtroFecha, setFiltroFecha] = useState("todos")
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("todas")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")

  useEffect(() => {
    setEventos(eventosMock)
  }, [])

  const hoy = new Date()
  const hoyISO = hoy.toISOString().split("T")[0]

  const ciudades = [...new Set(eventos.map(e => e.lugar))]
  const categorias = [...new Set(eventos.map(e => e.categoria))]

  const eventosFiltrados = eventos.filter(evento => {
    const fechaEvento = new Date(evento.fecha)

    // Filtro fecha
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

    // Filtro ciudad
    if (ciudadSeleccionada !== "todas" && evento.lugar !== ciudadSeleccionada)
      return false

    // Filtro categoría
    if (categoriaSeleccionada !== "todas" && evento.categoria !== categoriaSeleccionada)
      return false

    return true
  })

  return (
    <div>

      <h2 style={{ marginBottom: "20px" }}>
        Eventos ({eventosFiltrados.length})
      </h2>

      {/* Filtros de fecha */}
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

      {/* Filtros ciudad y categoría */}
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

      {/* Lista de eventos */}
      {eventosFiltrados.map(evento => {
        const esFavorito = favoritos.includes(evento.id)

        return (
          <div
            key={evento.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "#fafafa"
            }}
          >
            <h3>{evento.titulo}</h3>
            <p><strong>Lugar:</strong> {evento.lugar}</p>
            <p><strong>Fecha:</strong> {evento.fecha}</p>
            <p><strong>Categoría:</strong> {evento.categoria}</p>

            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <Link to={`/eventos/${evento.id}`}>
                Ver detalle
              </Link>

              <button
                onClick={() => toggleFavorito(evento.id)}
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
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { EventosContext } from "../context/EventosContext"
import { UserContext } from "../context/UserContext"

export default function CrearEvento() {

  const { agregarEvento } = useContext(EventosContext)
  const { usuario } = useContext(UserContext)
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [lugar, setLugar] = useState("")
  const [categoria, setCategoria] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechas, setFechas] = useState([])
  const [fechaInput, setFechaInput] = useState("")

  const agregarFecha = () => {
    if (fechaInput && !fechas.includes(fechaInput)) {
      setFechas([...fechas, fechaInput])
      setFechaInput("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!titulo || !lugar || !categoria || fechas.length === 0) {
      alert("Completá todos los campos obligatorios")
      return
    }

    agregarEvento({
      titulo,
      lugar,
      categoria,
      descripcion,
      fechas,
      creador: usuario.nombre
    })

    navigate("/eventos")
  }

  return (
    <div>
      <h2>Crear Evento</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>

        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Lugar:</label>
          <input
            type="text"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Categoría:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <option value="">Seleccionar categoría</option>
            <option value="Fiesta">Fiesta</option>
            <option value="Festival">Festival</option>
            <option value="Concierto">Concierto</option>
            <option value="Gastronómico">Gastronómico</option>
            <option value="Tradicionalista">Tradicionalista</option>
            <option value="Deportivo">Deportivo</option>
          </select>
        </div>

        <div>
          <label>Fechas:</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="date"
              value={fechaInput}
              onChange={(e) => setFechaInput(e.target.value)}
            />
            <button type="button" onClick={agregarFecha}>
              + Agregar
            </button>
          </div>

          <ul>
            {fechas.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            style={{ width: "100%", marginBottom: "15px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 15px",
            background: "#ff7a00",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Crear Evento
        </button>

      </form>
    </div>
  )
}
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { EventosContext } from "../context/EventosContext"
import { AuthContext } from "../context/AuthContext"

export default function CrearEvento() {

  const { agregarEvento } = useContext(EventosContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [provincia, setProvincia] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [lugar, setLugar] = useState("")
  const [categoria, setCategoria] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechas, setFechas] = useState([])
  const [fechaInput, setFechaInput] = useState("")
  const [imagen, setImagen] = useState("")

  const agregarFecha = () => {
    if (fechaInput && !fechas.includes(fechaInput)) {
      setFechas([...fechas, fechaInput])
      setFechaInput("")
    }
  }

  const validarImagen = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!titulo || !provincia || !ciudad || !categoria || fechas.length === 0) {
      alert("Completá todos los campos obligatorios")
      return
    }

    if (imagen) {
      const imagenValida = await validarImagen(imagen)
      if (!imagenValida) {
        alert("La imagen no es válida")
        return
      }
    }

    await agregarEvento({
      titulo,
      provincia,
      ciudad,
      lugar,
      categoria,
      descripcion,
      fechas,
      imagen,
      creador: user?.email || "anonimo",
      estado: "pendiente",
      destacado: false
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
          <label>Provincia:</label>
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <option value="">Seleccionar provincia</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="Catamarca">Catamarca</option>
            <option value="Chaco">Chaco</option>
            <option value="Chubut">Chubut</option>
            <option value="Córdoba">Córdoba</option>
            <option value="Corrientes">Corrientes</option>
            <option value="Entre Ríos">Entre Ríos</option>
            <option value="Formosa">Formosa</option>
            <option value="Jujuy">Jujuy</option>
            <option value="La Pampa">La Pampa</option>
            <option value="La Rioja">La Rioja</option>
            <option value="Mendoza">Mendoza</option>
            <option value="Misiones">Misiones</option>
            <option value="Neuquén">Neuquén</option>
            <option value="Río Negro">Río Negro</option>
            <option value="Salta">Salta</option>
            <option value="San Juan">San Juan</option>
            <option value="San Luis">San Luis</option>
            <option value="Santa Cruz">Santa Cruz</option>
            <option value="Santa Fe">Santa Fe</option>
            <option value="Santiago del Estero">Santiago del Estero</option>
            <option value="Tierra del Fuego">Tierra del Fuego</option>
            <option value="Tucumán">Tucumán</option>
            <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
          </select>
        </div>

        <div>
          <label>Ciudad:</label>
          <input
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
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
            <option value="Música">Música</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Tradicionalista">Tradicionalista</option>
            <option value="Deportes">Deportes</option>
            <option value="Cultura">Cultura</option>
            <option value="Motor">Motor</option>
            <option value="Familiar">Familiar</option>
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

        <div>
          <label>Imagen del evento (URL):</label>
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
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
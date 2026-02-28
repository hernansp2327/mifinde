import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { EventosContext } from "../context/EventosContext"

function CrearEvento() {

  const { agregarEvento } = useContext(EventosContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: "",
    lugar: "",
    fecha: "",
    categoria: "",
    descripcion: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    agregarEvento(form)

    navigate("/eventos")
  }

  return (
    <div>
      <h2>Crear Nuevo Evento</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px" }}>
        
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lugar"
          placeholder="Ciudad"
          value={form.lugar}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px",
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

export default CrearEvento
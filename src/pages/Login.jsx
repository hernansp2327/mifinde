import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

function Login() {

  const { setUsuario } = useContext(UserContext)

  const [nombre, setNombre] = useState("")
  const [rol, setRol] = useState("usuario")

  const navigate = useNavigate()

  const iniciarSesion = () => {

    const nuevoUsuario = {
      nombre: nombre || "Usuario",
      rol
    }

    setUsuario(nuevoUsuario)

    navigate("/")
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Iniciar sesión
        </h1>

        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full border p-2 rounded mb-6"
        >
          <option value="usuario">Usuario</option>
          <option value="organizador">Organizador</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={iniciarSesion}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Continuar
        </button>

      </div>

    </div>
  )
}

export default Login
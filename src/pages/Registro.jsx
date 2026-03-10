import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export default function Registro() {

  const { setUsuario } = useContext(UserContext)
  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegistro = (e) => {
    e.preventDefault()

    const nuevoUsuario = {
      nombre: nombre,
      email: email,
      rol: "user"
    }

    console.log("Usuario creado:", nuevoUsuario)

    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario))

    setUsuario(nuevoUsuario)

    navigate("/")
  }

  return (
    <div className="flex justify-center items-center mt-20">

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Crear cuenta
        </h2>

        <form onSubmit={handleRegistro} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Nombre"
            className="border rounded-lg p-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
          >
            Crear cuenta
          </button>

        </form>

      </div>

    </div>
  )
}
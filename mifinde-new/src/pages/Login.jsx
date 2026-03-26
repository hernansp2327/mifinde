import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../mifinde-new/src/context/AuthContext"

export default function Login() {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)
      navigate("/")
    } catch (err) {
      console.error(err)
      setError("Email o contraseña incorrectos")
    }
  }

  return (
    <div className="flex justify-center items-center mt-20">

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Iniciar sesión
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

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

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
          >
            Iniciar sesión
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          ¿No tenés cuenta?
        </p>

        <button
          onClick={() => navigate("/registro")}
          className="w-full mt-2 border border-orange-500 text-orange-500 p-3 rounded-lg hover:bg-orange-50"
        >
          Crear cuenta
        </button>

      </div>

    </div>
  )
}
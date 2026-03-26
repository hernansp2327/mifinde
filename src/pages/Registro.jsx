import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export default function Registro() {

  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegistro = async (e) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      // 🔐 crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // 💾 guardar datos en Firestore
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nombre,
        email,
        rol: "usuario",
        solicitudOrganizador: false
      })

      // 🧠 pequeña pausa para evitar error de render
      await new Promise(resolve => setTimeout(resolve, 300))

      navigate("/")

    } catch (err) {
      console.error(err)
      setError(err.message) // 🔥 ahora muestra el error real
    } finally {
      setLoading(false)
    }
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

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

        </form>

      </div>

    </div>
  )
}
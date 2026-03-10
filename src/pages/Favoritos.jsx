import { useContext } from "react"
import { FavoritosContext } from "../context/FavoritosContext"
import { EventosContext } from "../context/EventosContext"
import { Link } from "react-router-dom"

export default function Favoritos() {

  const { favoritos, toggleFavorito } = useContext(FavoritosContext)
  const { eventos } = useContext(EventosContext)

  const eventosFavoritos = eventos.filter(evento =>
    favoritos.includes(Number(evento.id))
  )

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        ❤️ Mis favoritos
      </h1>

      {eventosFavoritos.length === 0 && (
        <p>No tienes eventos guardados todavía.</p>
      )}

      <div className="grid gap-4">

        {eventosFavoritos.map((evento) => (

          <div
            key={evento.id}
            className="border p-4 rounded-lg shadow"
          >

            <Link to={`/eventos/${evento.id}`}>

              {evento.imagen && (
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}

              <h2 className="text-xl font-semibold">
                {evento.titulo}
              </h2>

              <p>
                📅 {evento.fechas?.[0]
                  ? new Date(evento.fechas[0]).toLocaleDateString("es-AR")
                  : "Fecha a confirmar"}
              </p>

              <p>
                📍 {evento.ciudad || "Ciudad no especificada"}, {evento.provincia || ""}
              </p>

            </Link>

            <button
              onClick={() => toggleFavorito(Number(evento.id))}
              className="bg-red-500 text-white px-3 py-1 rounded mt-3"
            >
              Quitar de favoritos
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}
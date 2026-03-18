import { useParams } from "react-router-dom"
import { useContext } from "react"
import { EventosContext } from "../context/EventosContext"
import { FavoritosContext } from "../context/FavoritosContext"

export default function EventoDetalle() {

  const { id } = useParams()

  const { eventos } = useContext(EventosContext)
  const { favoritos, toggleFavorito } = useContext(FavoritosContext)

  let evento = eventos.find(e => Number(e.id) === Number(id))

  if (!evento) {
    evento = eventos[Number(id)]
  }

  if (!evento) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Evento no encontrado</h2>
        <p>Puede que el evento haya sido eliminado.</p>
      </div>
    )
  }

  const eventoId = Number(evento.id)
  const esFavorito = favoritos.includes(eventoId)

  const imagenFallback = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"

  // 🔥 COMPARTIR
  const compartirEvento = () => {
    const url = window.location.href
    const texto = `Mirá este evento: ${evento.titulo} - ${url}`

    if (navigator.share) {
      navigator.share({
        title: evento.titulo,
        text: texto,
        url: url
      })
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="relative">

        <img
          src={evento.imagen || imagenFallback}
          alt={evento.titulo}
          className="w-full h-[420px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* BOTONES SUPERIORES */}
        <div className="absolute top-4 right-4 flex gap-2">

          <button
            onClick={() => toggleFavorito(eventoId)}
            className="bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow hover:scale-110 transition"
          >
            {esFavorito ? "❤️" : "🤍"}
          </button>

          <button
            onClick={compartirEvento}
            className="bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow hover:scale-110 transition"
          >
            📤
          </button>

        </div>

        {/* INFO */}
        <div className="absolute bottom-0 p-6 text-white max-w-4xl">
          <h1 className="text-4xl font-black mb-2 drop-shadow-lg">
            {evento.titulo}
          </h1>

          <p className="text-lg text-gray-200">
            📍 {evento.ciudad || "Ciudad no especificada"}, {evento.provincia || ""}
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-xl p-8 -mt-20 relative z-10">

          {/* CATEGORIA + LUGAR */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
              🏷️ {evento.categoria}
            </span>

            {evento.lugar && (
              <span className="text-gray-600">
                📌 {evento.lugar}
              </span>
            )}
          </div>

          {/* BOTONES COMPARTIR EXTRA */}
          <div className="flex gap-3 mb-10 flex-wrap">

            <button
              onClick={compartirEvento}
              className="bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              📲 Compartir
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              WhatsApp
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              Facebook
            </a>

          </div>

          {/* FECHAS */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">📅 Fechas</h2>

            {evento.fechas && evento.fechas.length > 0 ? (
              <div className="grid gap-3">
                {evento.fechas.map((f, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 px-4 py-3 rounded-lg font-medium"
                  >
                    {new Date(f).toLocaleDateString("es-AR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long"
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Fecha a confirmar</p>
            )}
          </div>

          {/* DESCRIPCIÓN */}
          {evento.descripcion && (
            <div>
              <h2 className="text-2xl font-bold mb-4">📖 Descripción</h2>

              <div className="bg-gray-100 p-6 rounded-xl leading-relaxed text-gray-700">
                {evento.descripcion}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
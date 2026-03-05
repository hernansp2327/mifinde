import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Descubrí qué hacer este finde
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
          MiFinde es la agenda digital donde encontrás fiestas, festivales,
          conciertos y eventos en tu ciudad.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/eventos"
            className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Explorar Eventos
          </Link>

          <Link
            to="/crear"
            className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-orange-600 transition"
          >
            Publicar Evento
          </Link>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
        
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold mb-3">Eventos cerca tuyo</h3>
          <p className="text-gray-600">
            Encontrá actividades en tu ciudad y organizá tu fin de semana en minutos.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold mb-3">Difusión para organizadores</h3>
          <p className="text-gray-600">
            Publicá tu evento y llegá a más personas en una plataforma dedicada.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold mb-3">Eventos destacados</h3>
          <p className="text-gray-600">
            Promocioná tu evento y aparecé primero en la agenda regional.
          </p>
        </div>

      </section>

    </div>
  )
}
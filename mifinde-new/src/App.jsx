export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* HERO */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Descubrí planes increíbles <br />
            para este finde
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-10">
            La agenda digital que conecta personas con eventos reales en su ciudad.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition duration-300">
              Explorar Eventos
            </button>

            <button className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-orange-600 transition duration-300">
              Publicar Evento
            </button>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center">

          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">
            <div className="text-5xl mb-6">📍</div>
            <h3 className="text-2xl font-semibold mb-4">
              Cerca tuyo
            </h3>
            <p className="text-gray-600">
              Eventos locales organizados por personas reales.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-2xl font-semibold mb-4">
              Difusión inteligente
            </h3>
            <p className="text-gray-600">
              Herramientas para que organizadores lleguen a más público.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">
            <div className="text-5xl mb-6">🔥</div>
            <h3 className="text-2xl font-semibold mb-4">
              Tendencias del momento
            </h3>
            <p className="text-gray-600">
              Descubrí lo que está pasando ahora en tu región.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
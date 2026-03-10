import { useState, useContext } from "react";
import { EventosContext } from "../context/EventosContext";
import { Link } from "react-router-dom";

function Home() {

  const contexto = useContext(EventosContext);
  const eventos = contexto?.eventos || [];

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const categorias = [
    "Todos",
    "Fiesta",
    "Música",
    "Gastronomía",
    "Tradicionalista",
    "Deportes",
    "Cultura",
    "Motor",
    "Familiar"
  ];

  const eventosAprobados = eventos.filter(
    (evento) => evento.estado === "aprobado"
  );

  const eventosFiltrados = eventosAprobados.filter((evento) => {

    const coincideBusqueda =
      (evento.titulo || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (evento.ciudad || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (evento.categoria || "").toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      evento.categoria === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;

  });

  // EVENTO DESTACADO

  const eventoDestacado = eventosFiltrados.find(e => e.destacado);

  // EVENTOS POPULARES (simulado)

  const eventosPopulares = [...eventosFiltrados]
    .sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0))
    .slice(0, 4);

  const otrosEventos = eventosFiltrados.filter(
    e => e.id !== eventoDestacado?.id
  );

  // EVENTOS ESTE FIN DE SEMANA

  const hoy = new Date();
  const dia = hoy.getDay();

  const diasHastaSabado = (6 - dia + 7) % 7;
  const sabado = new Date(hoy);
  sabado.setDate(hoy.getDate() + diasHastaSabado);

  const domingo = new Date(sabado);
  domingo.setDate(sabado.getDate() + 1);

  const eventosFinDeSemana = eventosFiltrados.filter((evento) => {

    if (!evento.fechas) return false;

    return evento.fechas.some((fecha) => {
      const fechaEvento = new Date(fecha);
      return fechaEvento >= sabado && fechaEvento <= domingo;
    });

  });

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">Eventos disponibles</h1>

      {/* BUSCADOR */}

      <input
        type="text"
        placeholder="🔎 Buscar eventos, ciudades o categorías"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* CATEGORÍAS */}

      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-3 py-1 rounded-full border ${
              categoriaSeleccionada === cat
                ? "bg-orange-500 text-white"
                : "bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EVENTO DESTACADO */}

      {eventoDestacado && (
        <Link to={`/eventos/${eventoDestacado.id}`}>
          <div
            className="relative rounded-xl mb-10 shadow overflow-hidden min-h-[320px]"
            style={{
              backgroundImage: eventoDestacado.imagen
                ? `url(${eventoDestacado.imagen})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >

            <div className="bg-black/60 p-6 text-white h-full flex flex-col justify-end">

              <h2 className="text-2xl font-bold mb-2">
                ⭐ Evento destacado
              </h2>

              <h3 className="text-xl font-semibold">
                {eventoDestacado.titulo}
              </h3>

              <p>
                📅 {eventoDestacado.fechas?.[0]
                  ? new Date(eventoDestacado.fechas[0]).toLocaleDateString("es-AR")
                  : "Fecha a confirmar"}
              </p>

              <p>
                📍 {eventoDestacado.ciudad}, {eventoDestacado.provincia}
              </p>

            </div>

          </div>
        </Link>
      )}

      {/* EVENTOS POPULARES */}

      <h2 className="text-2xl font-bold mb-4">
        🔥 Eventos populares
      </h2>

      <div className="grid gap-4 mb-10">

        {eventosPopulares.map((evento) => (

          <Link key={evento.id} to={`/eventos/${evento.id}`}>

            <div className="border p-4 rounded-lg shadow hover:shadow-lg">

              {evento.imagen && (
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h3 className="text-lg font-semibold">
                {evento.titulo}
              </h3>

              <p>
                📅 {evento.fechas?.[0]
                  ? new Date(evento.fechas[0]).toLocaleDateString("es-AR")
                  : "Fecha a confirmar"}
              </p>

              <p>
                📍 {evento.ciudad}, {evento.provincia}
              </p>

            </div>

          </Link>

        ))}

      </div>

      {/* EVENTOS ESTE FIN DE SEMANA */}

      {eventosFinDeSemana.length > 0 && (
        <div className="mb-10">

          <h2 className="text-2xl font-bold mb-4">
            📅 Este fin de semana
          </h2>

          <div className="grid gap-4">

            {eventosFinDeSemana.map((evento) => (
              <Link key={evento.id} to={`/eventos/${evento.id}`}>
                <div className="border p-4 rounded-lg shadow bg-orange-50 hover:shadow-lg">

                  {evento.imagen && (
                    <img
                      src={evento.imagen}
                      alt={evento.titulo}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}

                  <h3 className="text-lg font-semibold">
                    {evento.titulo}
                  </h3>

                  <p>
                    📅 {evento.fechas?.[0]
                      ? new Date(evento.fechas[0]).toLocaleDateString("es-AR")
                      : "Fecha a confirmar"}
                  </p>

                  <p>
                    📍 {evento.ciudad}, {evento.provincia}
                  </p>

                </div>
              </Link>
            ))}

          </div>

        </div>
      )}

      {/* OTROS EVENTOS */}

      <h2 className="text-2xl font-bold mb-4">
        🎉 Otros eventos
      </h2>

      <div className="grid gap-4">

        {otrosEventos.map((evento) => (
          <Link key={evento.id} to={`/eventos/${evento.id}`}>
            <div className="border p-4 rounded-lg shadow hover:shadow-lg">

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
                📍 {evento.ciudad}, {evento.provincia}
              </p>

              <p className="mt-2">{evento.descripcion}</p>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Home;
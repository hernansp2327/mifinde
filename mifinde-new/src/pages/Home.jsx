import { useContext } from "react";
import { EventosContext } from "../context/EventosContext";

export default function Home() {

  const contexto = useContext(EventosContext);
  const eventos = contexto?.eventos || [];

  const eventosAprobados = eventos.filter(
    (e) => e.estado === "aprobado"
  );

  return (
    <div>
      <h1>Eventos disponibles</h1>

      {eventosAprobados.length === 0 ? (
        <p>No hay eventos disponibles</p>
      ) : (
        eventosAprobados.map((evento) => (
          <div key={evento.id} style={{ marginBottom: "20px" }}>
            <h3>{evento.titulo}</h3>
            <p>{evento.descripcion}</p>
            <p>{evento.fecha}</p>
          </div>
        ))
      )}
    </div>
  );
}
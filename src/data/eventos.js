const hoy = new Date()

const sumarDias = (dias) => {
  const fecha = new Date(hoy)
  fecha.setDate(hoy.getDate() + dias)
  return fecha.toISOString().split("T")[0]
}

export const eventos = [
  {
    id: 1,
    titulo: "Fiesta Electrónica",
    lugar: "Paraná",
    fecha: sumarDias(0),
    categoria: "Entretenimiento",
    descripcion: "Una noche a pura música electrónica con DJs invitados."
  },
  {
    id: 2,
    titulo: "Festival Gastronómico",
    lugar: "Diamante",
    fecha: sumarDias(2),
    categoria: "Gastronomía",
    descripcion: "Comida regional, food trucks y shows en vivo."
  },
  {
    id: 3,
    titulo: "Peña Folklórica",
    lugar: "Victoria",
    fecha: sumarDias(5),
    categoria: "Tradicional",
    descripcion: "Folklore y tradición argentina."
  },
  {
    id: 4,
    titulo: "Conferencia de Innovación",
    lugar: "Córdoba",
    fecha: sumarDias(10),
    categoria: "Charlas y Formación",
    descripcion: "Charlas sobre tecnología y emprendimiento."
  },
  {
    id: 5,
    titulo: "Exposición de Arte",
    lugar: "Buenos Aires",
    fecha: sumarDias(30),
    categoria: "Cultura",
    descripcion: "Muestra de artistas contemporáneos."
  }
]
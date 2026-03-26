const hoy = new Date()

const sumarDias = (dias) => {
  const fecha = new Date(hoy)
  fecha.setDate(hoy.getDate() + dias)
  return fecha.toISOString().split("T")[0]
}

const imagenes = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a", // musica
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9", // comida
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70", // autos
  "https://images.unsplash.com/photo-1518972559570-7cc1309f3229", // rock
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", // familia
  "https://images.unsplash.com/photo-1511192336575-5a79af67a629"  // folklore
]

const categorias = [
  "Música",
  "Gastronomía",
  "Motor",
  "Familiar",
  "Tradicionalista"
]

const ciudades = ["Paraná", "Diamante", "Victoria"]

export const eventos = Array.from({ length: 30 }, (_, i) => {
  const categoria = categorias[i % categorias.length]

  return {
    id: i + 1,
    titulo: `Evento ${categoria} ${i + 1}`,
    ciudad: ciudades[i % ciudades.length],
    provincia: "Entre Ríos",
    fechas: [sumarDias(i)],
    categoria,
    descripcion: `Disfrutá de un evento de ${categoria.toLowerCase()} con actividades, música y entretenimiento.`,
    imagen: imagenes[i % imagenes.length],
    destacado: i % 7 === 0, // algunos destacados
    estado: "aprobado"
  }
})
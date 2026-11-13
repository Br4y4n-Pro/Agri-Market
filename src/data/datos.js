export const categorias = [
  { nombre: 'Frutas', total: 12, icono: '🍊' },
  { nombre: 'Hortalizas', total: 5, icono: '🥬' },
  { nombre: 'Tubérculos', total: 3, icono: '🥔' },
  { nombre: 'Granos', total: 9, icono: '🌽' },
]

export const productos = [
  { id: 1, nombre: 'Tomate chonto', categoria: 'Hortalizas', productor: 'Granja de tomates', precio: 2500, disponible: 40, icono: '🍅', imagen: '/productos/tomate.webp', origen: 'Fusagasugá, Cundinamarca', cosecha: 'hace 2 días' },
  { id: 2, nombre: 'Papa criolla', categoria: 'Tubérculos', productor: 'Finca La Esperanza', encargado: 'Doña Rosa', precio: 3000, disponible: 20, icono: '🥔', imagen: '/productos/papa.png', origen: 'Zipaquirá, Cundinamarca', cosecha: 'hace 3 días' },
  { id: 3, nombre: 'Cebolla cabezona', categoria: 'Hortalizas', productor: 'Cultivos Don Carlos', precio: 2000, disponible: 35, icono: '🧅', imagen: '/productos/cebolla.png', origen: 'Tausa, Cundinamarca', cosecha: 'hace 1 día' },
]

export const solicitudesRecibidas = [
  { id: 101, comprador: 'María López', producto: 'Papa criolla', cantidad: 10, total: 30000, fecha: 'Hoy, 9:20', estado: 'Nueva' },
  { id: 102, comprador: 'Carlos Ramírez', producto: 'Tomate chonto', cantidad: 8, total: 20000, fecha: 'Hoy, 8:45', estado: 'Nueva' },
  { id: 103, comprador: 'Ana Martínez', producto: 'Cebolla cabezona', cantidad: 5, total: 10000, fecha: 'Ayer', estado: 'Aceptada' },
]

export const misSolicitudes = [
  { id: 201, producto: 'Papa criolla', productor: 'Finca La Esperanza', cantidad: 3, total: 9000, fecha: 'Hoy', estado: 'Pendiente' },
  { id: 202, producto: 'Tomate chonto', productor: 'Granja de tomates', cantidad: 2, total: 5000, fecha: '10 nov', estado: 'Aceptada' },
  { id: 203, producto: 'Cebolla cabezona', productor: 'Cultivos Don Carlos', cantidad: 4, total: 8000, fecha: '8 nov', estado: 'Rechazada' },
]

export const pesos = (n) => '$' + n.toLocaleString('es-CO')

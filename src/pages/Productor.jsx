import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { Estado, Estadistica, Miniatura, Campo, Confirmacion } from '../components/Ui'
import { productos, solicitudesRecibidas, categorias, pesos } from '../data/datos'

const botonPublicar = <Link to="/productor/publicar" className="btn-primario self-start">Publicar producto</Link>

function TablaSolicitudes({ filas, conAcciones }) {
  const [estados, setEstados] = useState(Object.fromEntries(filas.map((f) => [f.id, f.estado])))
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <ul className="divide-y divide-black/5">
        {filas.map((s) => (
          <li key={s.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{s.comprador}</p>
              <p className="text-sm text-gray-600">{s.producto} · {s.cantidad} kg · {pesos(s.total)}</p>
              <p className="text-xs text-gray-500">{s.fecha}</p>
            </div>
            <div className="flex items-center gap-2">
              <Estado valor={estados[s.id]} />
              {conAcciones && estados[s.id] === 'Nueva' && (
                <>
                  <button onClick={() => setEstados({ ...estados, [s.id]: 'Aceptada' })} className="btn-primario px-4 py-2 text-sm">Aceptar</button>
                  <button onClick={() => setEstados({ ...estados, [s.id]: 'Rechazada' })} className="btn-secundario px-4 py-2 text-sm">Rechazar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PanelProductor() {
  return (
    <Layout rol="productor" titulo="Panel del productor" descripcion="Así va tu finca hoy." accion={botonPublicar}>
      <section className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-banner p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-activo">Tu finca</p>
          <p className="mt-1 text-h1">Finca La Esperanza</p>
          <p className="text-sm text-white/85">Zipaquirá, Cundinamarca · Doña Rosa</p>
        </div>
        <span className="text-5xl" aria-hidden="true">👩‍🌾</span>
      </section>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Estadistica titulo="Productos publicados" valor="12" nota="3 por agotarse" icono="📦" />
        <Estadistica titulo="Solicitudes nuevas" valor="5" nota="Responde pronto" icono="📋" />
        <Estadistica titulo="Aceptadas" valor="3" nota="Esta semana" icono="✅" />
        <Estadistica titulo="Ventas del mes" valor="$480.000" nota="Noviembre" icono="💵" />
      </div>
      <div className="mt-8 mb-3 flex items-center justify-between">
        <h2 className="text-h2">Solicitudes recientes</h2>
        <Link to="/productor/solicitudes" className="text-sm font-semibold text-primario">Ver todas las solicitudes</Link>
      </div>
      <TablaSolicitudes filas={solicitudesRecibidas} />
    </Layout>
  )
}

export function PublicarProducto() {
  const navegar = useNavigate()
  return (
    <Layout rol="productor" titulo="Publicar producto" descripcion="Cuéntale a los compradores qué cosechaste.">
      <form className="tarjeta grid gap-5 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); navegar('/productor/publicado') }}>
        <div className="md:col-span-2">
          <span className="etiqueta">Foto del producto</span>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primario/40 bg-crema p-8 text-center text-sm text-gray-600">
            <span className="text-3xl" aria-hidden="true">📷</span>
            Toca para tomar o subir una foto
            <input type="file" accept="image/*" className="sr-only" />
          </label>
        </div>
        <Campo id="producto" etiqueta="Nombre del producto" placeholder="Papa criolla" required />
        <div>
          <label htmlFor="categoria" className="etiqueta">Categoría</label>
          <select id="categoria" className="campo" required defaultValue="">
            <option value="" disabled>Elige una categoría</option>
            {categorias.map((c) => <option key={c.nombre}>{c.nombre}</option>)}
          </select>
        </div>
        <Campo id="precio" etiqueta="Precio por kilo (COP)" type="number" min="0" placeholder="3000" required />
        <Campo id="cantidad" etiqueta="Cantidad disponible (kg)" type="number" min="1" placeholder="20" required />
        <div className="md:col-span-2">
          <label htmlFor="descripcion" className="etiqueta">Descripción (opcional)</label>
          <textarea id="descripcion" rows="3" className="campo" placeholder="Cosechada esta semana, lavada y seleccionada." />
        </div>
        <div className="flex justify-end md:col-span-2">
          <button className="btn-primario w-full sm:w-auto">Publicar ahora</button>
        </div>
      </form>
    </Layout>
  )
}

export function ProductoPublicado() {
  return (
    <Layout rol="productor" titulo="Producto publicado" activo="/productor/publicar">
      <Confirmacion titulo="Tu producto fue publicado" texto="Los compradores ya lo pueden ver en el catálogo.">
        <div className="mt-6 flex w-full max-w-md items-center gap-4 rounded-xl bg-crema p-4 text-left">
          <Miniatura icono="🥔" imagen="/productos/papa.png" alt="Papa criolla" />
          <div>
            <p className="font-semibold">Papa criolla, 20 kg</p>
            <p className="text-sm text-gray-600">Tubérculos · {pesos(3000)} / kg</p>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link to="/productor/productos" className="btn-primario">Ver mis productos</Link>
          <Link to="/productor" className="btn-secundario">Volver al inicio</Link>
        </div>
      </Confirmacion>
    </Layout>
  )
}

export function MisProductos() {
  return (
    <Layout rol="productor" titulo="Mis productos" descripcion="Edita el precio o la cantidad, o retira lo que ya vendiste." accion={botonPublicar}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <article key={p.id} className="tarjeta flex flex-col">
            <div className="flex items-center gap-3">
              <Miniatura icono={p.icono} imagen={p.imagen} alt={p.nombre} />
              <div>
                <h2 className="text-h3">{p.nombre}</h2>
                <p className="text-sm text-gray-600">{p.categoria}</p>
              </div>
            </div>
            <p className="mt-4 font-semibold">{pesos(p.precio)} / kg</p>
            <p className="text-sm text-gray-600">Disponible: {p.disponible} kg</p>
            <div className="mt-4 flex gap-2">
              <button className="btn-secundario flex-1 px-3 py-2 text-sm">Editar</button>
              <button className="btn flex-1 border-2 border-error px-3 py-2 text-sm text-error hover:bg-red-50">Retirar</button>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  )
}

export function SolicitudesRecibidas() {
  return (
    <Layout rol="productor" titulo="Solicitudes recibidas" descripcion="Acepta o rechaza los pedidos que te llegan.">
      <TablaSolicitudes filas={solicitudesRecibidas} conAcciones />
    </Layout>
  )
}

export function ResumenVentas() {
  const masPedidos = [['Papa criolla', 18], ['Tomate chonto', 12], ['Cebolla cabezona', 7]]
  const max = masPedidos[0][1]
  return (
    <Layout rol="productor" titulo="Resumen de ventas" descripcion="Lo que has vendido y lo que más te piden.">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Estadistica titulo="Solicitudes recibidas" valor="24" nota="Noviembre" icono="📋" />
        <Estadistica titulo="Aceptadas" valor="19" nota="79 % del total" icono="✅" />
        <Estadistica titulo="Rechazadas" valor="5" nota="Sin cantidad suficiente" icono="✖️" />
        <Estadistica titulo="Total vendido" valor="$480.000" nota="Noviembre" icono="💵" />
      </div>
      <section className="tarjeta mt-6">
        <h2 className="text-h2">Lo que más te piden</h2>
        <ul className="mt-4 space-y-3">
          {masPedidos.map(([nombre, n]) => (
            <li key={nombre}>
              <div className="flex justify-between text-sm"><span>{nombre}</span><span className="font-semibold">{n} solicitudes</span></div>
              <div className="mt-1 h-3 rounded-full bg-crema"><div className="h-3 rounded-full bg-primario" style={{ width: `${(n / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

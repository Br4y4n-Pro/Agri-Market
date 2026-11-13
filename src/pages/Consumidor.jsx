import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { Estado, Estadistica, Miniatura, Confirmacion } from '../components/Ui'
import { productos, categorias, misSolicitudes, pesos } from '../data/datos'

const botonSolicitudes = <Link to="/mis-solicitudes" className="btn-primario self-start">Mis solicitudes</Link>

export function Catalogo() {
  const [params] = useSearchParams()
  const [categoria, setCategoria] = useState(null)
  const lista = categoria ? productos.filter((p) => p.categoria === categoria) : productos

  return (
    <Layout rol="consumidor" titulo="Catálogo de productos" descripcion="Compra directo a los campesinos de Cundinamarca." accion={botonSolicitudes}
      activo={params.get('vista') === 'categorias' ? '/catalogo?vista=categorias' : undefined}>
      <section className="flex flex-col overflow-hidden rounded-2xl bg-banner text-white sm:flex-row">
        <div className="flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-400 p-6 sm:w-2/5"><img src="/productos/tomate.webp" alt="" className="h-36 object-contain drop-shadow-lg" /></div>
        <div className="flex flex-1 items-center justify-between gap-4 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-activo">Productor destacado</p>
            <p className="mt-1 text-h1">Granja de tomates</p>
            <p className="text-sm text-white/85">Tomates cosechados en Fusagasugá y vendidos sin intermediarios.</p>
            <p className="mt-4 text-sm text-activo">Desde {pesos(2500)} / kg</p>
          </div>
          <span className="hidden text-4xl sm:block" aria-hidden="true">👨‍🌾</span>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categorias.map((c) => (
          <button key={c.nombre} onClick={() => setCategoria(categoria === c.nombre ? null : c.nombre)} aria-pressed={categoria === c.nombre}
            className={`text-left transition ${categoria === c.nombre ? 'ring-2 ring-primario rounded-xl' : ''}`}>
            <Estadistica titulo={c.nombre} valor={c.total} nota="productos disponibles" icono={c.icono} />
          </button>
        ))}
      </div>

      <div className="mt-8 mb-3 flex items-center justify-between">
        <h2 className="text-h2">{categoria ? `Productos: ${categoria}` : 'Productos disponibles'}</h2>
        {categoria && <button onClick={() => setCategoria(null)} className="text-sm font-semibold text-primario">Ver todos los productos</button>}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <div className="hidden grid-cols-5 bg-crema px-4 py-3 text-xs font-semibold text-gray-600 md:grid">
          <span>Producto</span><span>Productor</span><span>Precio</span><span>Estado</span><span>Cantidad</span>
        </div>
        <ul className="divide-y divide-black/5">
          {lista.map((p) => (
            <li key={p.id}>
              <Link to={`/producto/${p.id}`} className="grid grid-cols-2 items-center gap-2 px-4 py-4 hover:bg-hueso md:grid-cols-5">
                <span className="flex items-center gap-3"><Miniatura icono={p.icono} imagen={p.imagen} alt={p.nombre} />
                  <span><span className="block font-semibold">{p.nombre}</span><span className="text-xs text-gray-500">{p.categoria}</span></span>
                </span>
                <span className="text-right text-sm md:text-left">{p.productor}</span>
                <span className="font-semibold">{pesos(p.precio)} / kg</span>
                <span className="text-right md:text-left"><Estado valor="Disponible" /></span>
                <span className="hidden text-sm text-gray-500 md:block">{p.disponible} kg</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export function DetalleProducto() {
  const { id } = useParams()
  const navegar = useNavigate()
  const p = productos.find((x) => x.id === Number(id)) || productos[1]
  const [kilos, setKilos] = useState(3)
  const excede = kilos > p.disponible

  return (
    <Layout rol="consumidor" titulo="Detalle del producto" descripcion="Conoce el producto y a quien lo cultiva antes de hacer tu pedido." activo="/catalogo">
      <article className="tarjeta flex flex-col items-center text-center sm:p-10">
        <Miniatura icono={p.icono} imagen={p.imagen} alt={p.nombre} tam="lg" />
        <h2 className="mt-4 text-3xl font-bold text-primario">{p.nombre}</h2>
        <p className="mt-1 text-sm text-gray-600">{p.categoria} · Cosechada {p.cosecha} en {p.origen}</p>

        <div className="mt-6 w-full max-w-lg rounded-xl bg-crema p-5 text-left">
          <p className="text-h3">{pesos(p.precio)} / kg · Disponible: {p.disponible} kg</p>
          <p className="mt-1 text-sm text-gray-600">Productor: {p.productor}{p.encargado ? ` · ${p.encargado}` : ''}</p>
          <label htmlFor="kilos" className="etiqueta mt-4">Cantidad a pedir (kg)</label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setKilos(Math.max(1, kilos - 1))} className="btn-secundario h-11 w-11 p-0" aria-label="Quitar un kilo">−</button>
            <input id="kilos" type="number" min="1" value={kilos} onChange={(e) => setKilos(Math.max(1, Number(e.target.value)))} className="campo w-24 text-center" />
            <button type="button" onClick={() => setKilos(kilos + 1)} className="btn-secundario h-11 w-11 p-0" aria-label="Agregar un kilo">+</button>
            <span className="ml-auto font-semibold">Total: {pesos(kilos * p.precio)}</span>
          </div>
          {excede && <p role="alert" className="mt-2 text-sm text-error">Solo hay {p.disponible} kg disponibles.</p>}
        </div>

        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button disabled={excede} onClick={() => navegar('/solicitud-enviada', { state: { p, kilos } })} className="btn-primario">Enviar solicitud</button>
          <Link to="/catalogo" className="btn-secundario">Volver al catálogo</Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">El pago y la entrega se acuerdan directamente con el productor.</p>
      </article>
    </Layout>
  )
}

export function SolicitudEnviada() {
  const p = productos[1]
  return (
    <Layout rol="consumidor" titulo="Solicitud enviada" descripcion="Tu pedido ya le llegó al productor." activo="/mis-solicitudes">
      <Confirmacion titulo="Tu solicitud fue enviada" texto="El productor revisará tu pedido y te avisaremos cuando lo acepte.">
        <div className="mt-6 flex w-full max-w-md items-center gap-4 rounded-xl bg-crema p-4 text-left">
          <Miniatura icono={p.icono} imagen={p.imagen} alt={p.nombre} />
          <div>
            <p className="font-semibold">{p.nombre}, 3 kg, {pesos(p.precio)} / kg</p>
            <p className="text-sm text-gray-600">{p.productor} · Total: {pesos(9000)}</p>
            <Estado valor="Pendiente" />
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link to="/mis-solicitudes" className="btn-primario">Ver mis solicitudes</Link>
          <Link to="/catalogo" className="btn-secundario">Seguir comprando</Link>
        </div>
      </Confirmacion>
    </Layout>
  )
}

export function MisSolicitudes() {
  return (
    <Layout rol="consumidor" titulo="Mis solicitudes" descripcion="Revisa si el productor ya aceptó tu pedido.">
      <ul className="space-y-3">
        {misSolicitudes.map((s) => (
          <li key={s.id} className="tarjeta flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{s.producto} · {s.cantidad} kg</p>
              <p className="text-sm text-gray-600">{s.productor} · {pesos(s.total)} · {s.fecha}</p>
            </div>
            <Estado valor={s.estado} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

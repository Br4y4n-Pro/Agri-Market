import { NavLink, Link } from 'react-router-dom'

const menus = {
  productor: {
    subtitulo: 'Espacio del productor',
    items: [
      { to: '/productor', texto: 'Inicio', icono: '🏠', exacto: true },
      { to: '/productor/productos', texto: 'Mis productos', icono: '📦' },
      { to: '/productor/publicar', texto: 'Publicar producto', icono: '➕' },
      { to: '/productor/solicitudes', texto: 'Solicitudes', icono: '📋' },
      { to: '/productor/resumen', texto: 'Resumen', icono: '📊' },
    ],
  },
  consumidor: {
    subtitulo: 'Espacio del comprador',
    items: [
      { to: '/catalogo', texto: 'Catálogo', icono: '🛒' },
      { to: '/catalogo?vista=categorias', texto: 'Categorías', icono: '🗂️' },
      { to: '/mis-solicitudes', texto: 'Mis solicitudes', icono: '📋' },
    ],
  },
}

export default function Layout({ rol, activo, titulo, descripcion, accion, children }) {
  const menu = menus[rol]
  const esActivo = (isActive, to) => (activo ? activo === to : isActive && !to.includes('?'))
  const claseItem = (isActive, to) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-badge transition ${
      esActivo(isActive, to) ? 'bg-activo font-semibold text-primario-oscuro' : 'text-primario-oscuro hover:bg-primario-claro'
    }`

  return (
    <div className="min-h-screen bg-hueso lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-black/5 bg-crema p-6 lg:flex">
        <div>
          <Link to="/" className="text-h1 text-primario">AgriMarket</Link>
          <p className="mt-1 text-xs text-gray-600">{menu.subtitulo}</p>
          <nav className="mt-8 space-y-1" aria-label="Menú principal">
            {menu.items.map((i) => (
              <NavLink key={i.to} to={i.to} end={i.exacto} className={({ isActive }) => claseItem(isActive, i.to)}>
                <span aria-hidden="true">{i.icono}</span>{i.texto}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="border-t border-black/10 pt-4">
          <Link to="/" className="flex items-center gap-2 text-badge text-primario-oscuro">← Cerrar sesión</Link>
          <p className="mt-3 text-xs text-gray-500">Del campo colombiano a tu mesa.</p>
        </div>
      </aside>

      <header className="flex items-center justify-between bg-crema px-4 py-3 lg:hidden">
        <Link to="/" className="text-h2 font-bold text-primario">AgriMarket</Link>
        <Link to="/" className="text-badge text-primario-oscuro">Salir</Link>
      </header>

      <main className="flex-1 px-4 pb-28 pt-6 sm:px-8 lg:px-12 lg:pb-12 lg:pt-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-h1">{titulo}</h1>
              {descripcion && <p className="mt-1 text-badge font-normal text-gray-600">{descripcion}</p>}
            </div>
            {accion}
          </div>
          {children}
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-black/10 bg-white py-2 lg:hidden" aria-label="Menú inferior">
        {menu.items.map((i) => (
          <NavLink key={i.to} to={i.to} end={i.exacto}
            className={({ isActive }) => `flex min-w-14 flex-col items-center rounded-lg px-2 py-1 text-[11px] ${esActivo(isActive, i.to) ? 'bg-activo font-semibold text-primario-oscuro' : 'text-gray-600'}`}>
            <span aria-hidden="true" className="text-lg">{i.icono}</span>{i.texto.replace(' producto', '')}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

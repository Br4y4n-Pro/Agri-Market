const estilosEstado = {
  Disponible: 'bg-primario-claro text-primario-oscuro',
  Aceptada: 'bg-primario-claro text-primario-oscuro',
  Nueva: 'bg-primario-claro text-primario-oscuro',
  Pendiente: 'bg-pendiente-fondo text-pendiente',
  Rechazada: 'bg-red-50 text-error',
}

export function Estado({ valor }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${estilosEstado[valor] || 'bg-gray-100'}`}>{valor}</span>
}

export function Miniatura({ icono, imagen, alt = '', tam = 'md' }) {
  const t = tam === 'lg' ? 'h-20 w-20 text-5xl' : 'h-12 w-12 text-2xl'
  if (imagen) return <img src={imagen} alt={alt} className={`shrink-0 rounded-full bg-white object-contain p-1 ring-1 ring-black/5 ${t}`} />
  return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-full bg-activo/40 ${t}`}>{icono}</span>
}

export function Estadistica({ titulo, valor, nota, icono }) {
  return (
    <div className="rounded-xl bg-crema p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-primario">{titulo}</p>
        <span aria-hidden="true">{icono}</span>
      </div>
      <p className="mt-2 text-h1">{valor}</p>
      <p className="mt-3 text-xs text-gray-500">{nota}</p>
    </div>
  )
}

export function Campo({ id, etiqueta, ayuda, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="etiqueta">{etiqueta}</label>
      <input id={id} className="campo" {...props} />
      {ayuda && <p className="mt-1 text-xs text-gray-500">{ayuda}</p>}
    </div>
  )
}

export function Confirmacion({ titulo, texto, children }) {
  return (
    <div className="tarjeta flex flex-col items-center text-center sm:p-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primario text-2xl text-white" aria-hidden="true">✓</span>
      <h2 className="mt-4 text-h2 text-primario-oscuro">{titulo}</h2>
      <p className="mt-1 text-badge font-normal text-gray-600">{texto}</p>
      {children}
    </div>
  )
}

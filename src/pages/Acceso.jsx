import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Campo } from '../components/Ui'

function PanelAcceso({ children }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-2">
      <section className="flex flex-col justify-between bg-cover bg-center p-8 text-white md:p-12"
        style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(46,125,50,.85), rgba(27,94,32,.92)), url(/campo.jpg)' }}>
        <p className="text-h2 font-bold">AgriMarket</p>
        <div className="my-10 md:my-0">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">Del campo colombiano<br />a tu mesa.</h1>
          <p className="mt-3 max-w-sm text-white/90">Conectamos pequeños productores con personas que quieren comprar fresco y directo.</p>        </div>
        <div className="hidden md:block">
          <p className="font-semibold">Un mercado más cercano.</p>
          <p className="text-sm text-white/80">Sin intermediarios, con precios claros desde el principio.</p>
        </div>
      </section>
      <section className="flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </div>
  )
}

export function Login() {
  const navegar = useNavigate()
  return (
    <PanelAcceso>
      <h2 className="text-h1">Bienvenido de nuevo</h2>
      <p className="mt-1 text-badge font-normal text-gray-600">Ingresa con tu correo para continuar.</p>
      <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); navegar('/productor') }}>
        <Campo id="correo" etiqueta="Correo electrónico" type="email" placeholder="ejemplo@correo.com" autoComplete="email" />
        <Campo id="clave" etiqueta="Contraseña" type="password" placeholder="••••••••" autoComplete="current-password" />
        <button className="btn-primario w-full">Ingresar</button>
      </form>
      <p className="mt-6 text-center text-badge font-normal text-gray-600">
        ¿No tienes cuenta? <Link to="/registro" className="font-semibold text-primario underline">Crear cuenta</Link>
      </p>
      <p className="mt-2 text-center text-xs text-gray-500">
        ¿Solo quieres mirar? <Link to="/catalogo" className="text-primario underline">Ver el catálogo</Link>
      </p>
    </PanelAcceso>
  )
}

export function Registro() {
  const [rol, setRol] = useState('productor')
  const navegar = useNavigate()
  const opcion = (valor, texto, icono) => (
    <button type="button" onClick={() => setRol(valor)} aria-pressed={rol === valor}
      className={`flex flex-1 flex-col items-center rounded-xl border-2 p-4 text-badge transition ${rol === valor ? 'border-primario bg-primario-claro text-primario-oscuro' : 'border-gray-200 text-gray-600'}`}>
      <span className="text-2xl" aria-hidden="true">{icono}</span>{texto}
    </button>
  )

  return (
    <PanelAcceso>
      <h2 className="text-h1">Crea tu cuenta</h2>
      <p className="mt-1 text-badge font-normal text-gray-600">Elige cómo vas a usar AgriMarket.</p>
      <div className="mt-6 flex gap-3">
        {opcion('productor', 'Soy productor', '👨‍🌾')}
        {opcion('consumidor', 'Soy comprador', '🛒')}
      </div>
      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); navegar(rol === 'productor' ? '/productor' : '/catalogo') }}>
        <Campo id="nombre" etiqueta="Nombre completo" placeholder="Carlos Pérez" required autoComplete="name" />
        <Campo id="correo-r" etiqueta="Correo electrónico" type="email" placeholder="ejemplo@correo.com" required autoComplete="email" />
        <Campo id="celular" etiqueta="Celular" type="tel" placeholder="300 123 4567" required autoComplete="tel" />
        {rol === 'productor' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo id="finca" etiqueta="Nombre de la finca" placeholder="Finca La Esperanza" required />
            <Campo id="municipio" etiqueta="Municipio" placeholder="Zipaquirá" required />
          </div>
        )}
        <Campo id="clave-r" etiqueta="Contraseña" type="password" placeholder="Mínimo 8 caracteres" minLength={8} required autoComplete="new-password" />
        <button className="btn-primario w-full">Crear cuenta</button>
      </form>
      <p className="mt-6 text-center text-badge font-normal text-gray-600">
        ¿Ya tienes cuenta? <Link to="/" className="font-semibold text-primario underline">Ingresar</Link>
      </p>
    </PanelAcceso>
  )
}

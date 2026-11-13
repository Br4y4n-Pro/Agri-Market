import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Login, Registro } from './pages/Acceso'
import { PanelProductor, PublicarProducto, ProductoPublicado, MisProductos, SolicitudesRecibidas, ResumenVentas } from './pages/Productor'
import { Catalogo, DetalleProducto, SolicitudEnviada, MisSolicitudes } from './pages/Consumidor'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productor" element={<PanelProductor />} />
        <Route path="/productor/publicar" element={<PublicarProducto />} />
        <Route path="/productor/publicado" element={<ProductoPublicado />} />
        <Route path="/productor/productos" element={<MisProductos />} />
        <Route path="/productor/solicitudes" element={<SolicitudesRecibidas />} />
        <Route path="/productor/resumen" element={<ResumenVentas />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/solicitud-enviada" element={<SolicitudEnviada />} />
        <Route path="/mis-solicitudes" element={<MisSolicitudes />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

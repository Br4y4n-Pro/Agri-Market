# AgriMarket – maquetación (React + Vite + Tailwind CSS)

Maquetación de las pantallas del MVP diseñadas en Figma. Todavía no hay backend: los datos salen de `src/data/datos.js` y los formularios solo navegan. La API en Node.js/Express y la base de datos en PostgreSQL van en la iteración 3 (tarjetas T-31 a T-33 de Trello).

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Pantallas

| Código | Pantalla | Ruta |
|---|---|---|
| P01 | Inicio de sesión | `/` |
| P02–P04 | Tipo de cuenta y registro (productor o comprador) | `/registro` |
| P05 | Panel del productor | `/productor` |
| P06 | Publicar producto y confirmación | `/productor/publicar`, `/productor/publicado` |
| P07 | Mis productos | `/productor/productos` |
| P08 | Solicitudes recibidas (aceptar o rechazar) | `/productor/solicitudes` |
| P09 | Resumen de ventas | `/productor/resumen` |
| P10 | Catálogo con categorías | `/catalogo` |
| P11–P12 | Detalle del producto y solicitud de compra | `/producto/:id` |
| — | Solicitud enviada | `/solicitud-enviada` |
| P13 | Mis solicitudes | `/mis-solicitudes` |

Es mobile first: en celular se ve el menú inferior y en computador la barra lateral, igual que en el prototipo de PC.

## Estructura

- `tailwind.config.js`: colores y tipografía de la guía de estilos (Tablas 3 y 4 del documento).
- `src/components/Layout.jsx`: barra lateral y menú inferior según el rol.
- `src/components/Ui.jsx`: componentes del UI Kit (estado, miniatura, estadística, campo, confirmación).
- `src/pages/`: pantallas de acceso, productor y consumidor.

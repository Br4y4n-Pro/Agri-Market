export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primario: { DEFAULT: '#2E7D32', oscuro: '#1B5E20', claro: '#E8F5E9' },
        bosque: '#1B2E21',
        hueso: '#F8F9FA',
        crema: '#F7F8EE',
        activo: '#FFE143',
        banner: '#0B5D0B',
        naranja: '#B45309',
        error: '#C62828',
        pendiente: { DEFAULT: '#A15C00', fondo: '#FFF4E0' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'] },
      fontSize: {
        h1: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '28px', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        cuerpo: ['16px', { lineHeight: '24px' }],
        badge: ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}

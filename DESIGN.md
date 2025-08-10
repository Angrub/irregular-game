# Guía de Diseño (UI) — Irregular Game

Esta guía define un diseño oscuro y minimalista, consistente y accesible, basado en Tailwind CSS.

## Principios
- **Oscuro**: fondo casi negro, alto contraste y elementos discretos.
- **Minimalista**: pocos adornos, tipografía clara, jerarquía simple.
- **Consistente**: reutiliza tokens/clases definidas aquí.
- **Accesible**: contrastes AA, estados de foco visibles.

## Paleta y Tokens (Tailwind)
- **Fondo base**: `bg-neutral-950`
- **Superficie**: `bg-neutral-900/80` con `backdrop-blur`
- **Bordes**: `border-neutral-800`
- **Texto principal**: `text-neutral-100`
- **Texto secundario/labels**: `text-neutral-400`
- **Sombras**: `shadow-lg`
- **Radio**: `rounded-xl`

## Tipografía
- Fuente del sistema (por defecto del navegador).
- Título de tarjeta: `text-lg font-semibold tracking-tight`
- Etiquetas/Secciones: `text-sm uppercase tracking-wider`
- Texto principal destacado: `text-4xl font-bold`

## Espaciado
- Contenedor de página: `p-6`
- Encabezado de tarjeta: `px-6 py-4`
- Contenido de tarjeta: `px-6 py-8`

## Layout
- Página raíz (`MainPage`):
  ```html
  <main class="min-h-screen w-full bg-neutral-950 text-neutral-100 flex justify-center items-center p-6">...</main>
  ```

## Componentes base
- **Card** (contenedor):
  ```html
  <div class="w-full max-w-md mx-auto rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur shadow-lg">...</div>
  ```
- **CardHeader**:
  ```html
  <div class="px-6 py-4 border-b border-neutral-800">...</div>
  ```
- **Título**:
  ```html
  <h2 class="text-neutral-100 text-lg font-semibold text-center tracking-tight">...</h2>
  ```
- **Etiqueta de sección**:
  ```html
  <p class="text-sm uppercase tracking-wider text-neutral-400">...</p>
  ```
- **Texto principal**:
  ```html
  <p class="text-4xl font-bold text-neutral-50">...</p>
  ```

## Estados y Accesibilidad
- Foco accesible sugerido para interactivos:
  ```html
  class="focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
  ```
- Mantener contraste suficiente (WCAG AA). Evitar texto < `text-neutral-400` sobre fondos muy oscuros si es crítico.

## Movimiento
- Transiciones discretas (opcional): `transition-colors duration-200`.
- Evitar animaciones llamativas por el enfoque minimalista.

## Ejemplo canónico (Card con título y texto principal)
```html
<div class="w-full max-w-md mx-auto rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur shadow-lg">
  <div class="px-6 py-4 border-b border-neutral-800">
    <h2 class="text-neutral-100 text-lg font-semibold text-center tracking-tight">Present verb</h2>
  </div>
  <div class="px-6 py-8">
    <div class="text-center space-y-2">
      <p class="text-sm uppercase tracking-wider text-neutral-400">Present</p>
      <p class="text-4xl font-bold text-neutral-50">walk</p>
    </div>
  </div>
</div>
```

## Notas de implementación
- Tailwind está habilitado en `vite` y `index.css` usa `@import 'tailwindcss';`.
- Estilos base aplicados en `src/index.css` para tema oscuro global.
- Reutiliza las clases de esta guía para asegurar consistencia.

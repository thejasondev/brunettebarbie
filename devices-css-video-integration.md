# Visualización de Videos con `devices.css`

Este documento describe en detalle cómo está implementada y optimizada la integración de la librería `devices.css` para la reproducción y previsualización de videos de portafolio dentro de maquetas (mockups) de dispositivos reales (iPhone, iPad, MacBook) en la aplicación ElevateCSM.

---

## 📋 Resumen de la Arquitectura

`devices.css` (v0.2.0) es una librería CSS que genera maquetas puras en HTML/CSS de dispositivos modernos (como iPhone 14 Pro, iPad Pro y MacBook Pro) sin necesidad de imágenes pesadas (PNG/SVG).

En ElevateCSM, combinamos `devices.css` con **React**, **Framer Motion** y **CSS personalizado** para ofrecer un showcase de videos altamente dinámico, responsivo y visualmente atractivo.

```
┌─────────────────────────────────────────────────────────────┐
│                    portfolio-card                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   portfolio-label                     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               portfolio-device-wrapper                │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │   DeviceWrapper (iPhone / iPad / MacBook)       │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │ device-frame                              │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │ ScreenContent                       │  │  │  │  │
│  │  │  │  │  ├─ <video src="...#t=0.001">       │  │  │  │  │
│  │  │  │  │  └─ portfolio-play-overlay          │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ 1. Componentes Principales en React

Ubicación: [`src/components/Portfolio.jsx`](file:///d:/Projects/ElevateCSM/src/components/Portfolio.jsx)

### A. Detección Responsiva Dinámica (`useDeviceType`)
El hook custom `useDeviceType` escucha el cambio de tamaño de la ventana (`window.innerWidth`) para determinar qué marco de dispositivo renderizar según la pantalla del visitante:

- **`< 768px` (Mobile)**: Asigna `'phone'` → Marco de **iPhone 14 Pro**.
- **`768px – 1023px` (Tablet)**: Asigna `'tablet'` → Marco de **iPad Pro**.
- **`>= 1024px` (Desktop)**: Asigna `'desktop'` → Marco de **MacBook Pro**.

### B. Envolventes de Dispositivos (`DeviceWrapper`)
Define componentes contenedores para cada tipo de maqueta provista por `devices.css`:

```jsx
function IPhoneFrame({ children }) {
  return (
    <div className="device device-iphone-14-pro">
      <div className="device-frame">{children}</div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
    </div>
  );
}
```

Cada dispositivo incluye sus piezas de hardware renderizadas por CSS (`device-stripe`, `device-header`, `device-sensors`, `device-btns`, `device-power`).

### C. Contenido de Pantalla (`ScreenContent`)
Se renderiza dentro de la clase `.device-frame`:

```jsx
export function ScreenContent({ src, onClick }) {
  return (
    <div className="device-screen" style={{ position: 'relative', cursor: 'pointer' }} onClick={onClick}>
      <video
        src={`${src}#t=0.001`}
        muted
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div className="portfolio-play-overlay">
        <div className="portfolio-play-btn">
          <FaPlay />
        </div>
      </div>
    </div>
  );
}
```

#### Key Highlights de `ScreenContent`:
1. **Truco `#t=0.001`**: Forzar la carga del primer fotograma como miniatura/poster nativo sin necesidad de generar imágenes de poster separadas ni descargar todo el archivo de video.
2. **Atributos de rendimiento/movilidad**: `muted`, `playsInline`, `webkit-playsinline="true"` y `preload="metadata"` garantizan compatibilidad móvil en iOS/Android.
3. **Superposición Play**: Un overlay con efecto hover que incluye el botón de reproducción. Al hacer clic, abre el modal a pantalla completa con sonido y controles completos (`VideoModal`).

---

## 🎨 2. Sistema de Maquetación CSS y Escalado (`global.css`)

Ubicación: [`src/styles/global.css`](file:///d:/Projects/ElevateCSM/src/styles/global.css)

Las dimensiones intrínsecas de las maquetas de `devices.css` son estáticas y grandes (p. ej. un MacBook de 960px). Para evitar desbordamientos y lograr un diseño responsivo fluido, se implementó el **Sistema de Layout v3 con Centrado Absoluto y Escala Ajustada**.

### A. Estrategia del Wrapper Estándar (`.portfolio-device-wrapper`)

```css
/* Card principal */
.portfolio-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Wrapper con corte de desbordamiento */
.portfolio-device-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
}

/* Centrado absoluto del dispositivo */
.portfolio-device-wrapper .device {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  z-index: 1;
}
```

### B. Breakpoints y Factor de Escala (`scale`)

Para encajar perfectamente el marco dentro de cada tamaño de pantalla, se controla la altura del wrapper y la escala del dispositivo mediante Media Queries:

| Breakpoint | Ancho Pantalla | Dispositivo Utilizado | Altura Wrapper (`height`) | Escala CSS (`scale`) |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | `< 768px` | iPhone 14 Pro | `470px` | `translate(-50%, -50%) scale(0.52)` |
| **Tablet** | `768px – 1023px` | iPad Pro | `520px` | `translate(-50%, -50%) scale(0.62)` |
| **Desktop** | `1024px – 1439px` | MacBook Pro | `340px` | `translate(-50%, -50%) scale(0.60)` |
| **Large Desktop** | `>= 1440px` | MacBook Pro | `400px` | `translate(-50%, -50%) scale(0.70)` |

### C. Ajuste del Video a la Pantalla (`.device-screen`)

Para asegurar que el video llene el área interna del marco sin deformarse:

```css
.device-screen {
  object-fit: cover;
  width: 100% !important;
  height: 100% !important;
}
```

---

## ⚡ 3. Correcciones de Renderizado y Compatibilidad WebKit (Safari/iOS)

Los elementos `<video>` dentro de bordes redondeados CSS complejos suelen sufrir el problema de **"Corner Bleed"** en navegadores WebKit/Safari (el contenido del video se sale de las esquinas redondeadas durante la reproducción).

Para solucionar esto, aplicamos correcciones CSS específicas:

### A. Aceleración por Hardware y Clip de Bordes

```css
.device-frame {
  overflow: hidden !important;
  transform: translateZ(0); 
  -webkit-transform: translateZ(0);
}
```
*`translateZ(0)` fuerza la creación de una capa de composición 3D en la GPU, asegurando que Safari respete el `overflow: hidden` con bordes redondeados.*

### B. Radio de Borde Específico por Dispositivo (`border-radius`)

```css
/* Esquinas redondeadas para iPhone 14 Pro */
.device-iphone-14-pro .device-frame,
.device-iphone-14-pro .device-screen,
.device-iphone-14-pro video {
  border-radius: 46px !important;
}

/* Esquinas redondeadas para iPad Pro */
.device-ipad-pro .device-frame,
.device-ipad-pro .device-screen,
.device-ipad-pro video {
  border-radius: 24px !important;
}

/* Esquinas inferiores para MacBook Pro */
.device-macbook-pro .device-frame,
.device-macbook-pro .device-screen,
.device-macbook-pro video {
  border-radius: 0 0 4px 4px !important;
}
```

---

## 📱 4. Modos de Presentación (Grid vs Carrusel Móvil)

En `Portfolio.jsx`, dependiendo del contexto y del tipo de dispositivo:

1. **Modo Preview Móvil (`MobileVideoCarousel`)**:
   - En pantallas pequeñas (`phone`), los maquetados se presentan mediante un carrusel táctil interactivo (soporta gestos de *swipe*, navegación manual por flechas/puntos y cambio automático cada 4 segundos).
   - Utiliza `AnimatePresence` y `motion.div` de Framer Motion para transiciones suaves de entrada/salida.

2. **Modo Grid (Desktop / Pagina Completa)**:
   - Utiliza CSS Grid (`.portfolio-grid`) configurado en 2 columnas para Desktop y 1 columna para Tablet/Mobile en la página completa del portafolio.

---

## 🎬 5. Reproducción Fullscreen (`VideoModal`)

Al presionar sobre cualquiera de las maquetas de dispositivo:
- Se suspende el scroll del documento (`document.body.style.overflow = 'hidden'`).
- Se despliega el modal en overlay con fondo oscuro desenfocado (`backdrop-blur-sm`).
- El video se ejecuta con sonido habilitado (`controls`, `autoPlay`), ofreciendo una experiencia inmersiva para el usuario.

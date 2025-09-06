# Simple Planning Poker - Frontend

Una aplicación moderna de Planning Poker construida con React, TypeScript y Socket.IO para estimación ágil de proyectos de software.

## ✨ Características

- 🎮 **Interfaz intuitiva** con tarjetas estilo poker para estimación
- 🎨 **Sistema de colores consistente** con modo claro/oscuro
- 🔄 **Tiempo real** con Socket.IO para colaboración instantánea  
- 📱 **Responsive design** optimizado para móvil y escritorio
- 👥 **Gestión de salas** con códigos únicos de 6 caracteres
- 🎯 **Secuencia Fibonacci** completa (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ∞, ?)
- 📊 **Análisis de resultados** con cálculo automático de promedio
- 💾 **Persistencia local** de datos de usuario

## 🛠️ Stack Tecnológico

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.8.2
- **Real-time Communication**: Socket.IO Client 4.8.1
- **Styling**: Tailwind CSS 4.1.12
- **Linting**: ESLint 9.33.0

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── router/                    # Configuración de rutas
│   │   ├── AppRouter.tsx         # Router principal
│   │   ├── HomePage.tsx          # Página de inicio
│   │   └── RoomPage.tsx          # Página de sala
│   └── types/                    # Definiciones TypeScript
│       └── index.ts              # Tipos principales (User, Room, etc.)
├── features/
│   ├── authentication/           # Gestión de usuarios
│   │   └── useLocalUser.ts      # Hook para usuarios locales
│   ├── room-management/          # Gestión de salas
│   │   ├── components/
│   │   │   ├── RoomHeader.tsx   # Header de sala con acciones
│   │   │   └── UserList.tsx     # Lista de participantes
│   │   ├── RoomContainer.tsx    # Container principal de sala
│   │   ├── useRoom.ts           # Hook para gestión de sala
│   │   └── useRoomSession.ts    # Hook para sesión de sala
│   └── voting/                   # Sistema de votación
│       ├── VotingArea.tsx       # Área de tarjetas de votación
│       └── ResultsPanel.tsx     # Panel de resultados
├── shared/
│   ├── constants/
│   │   └── index.ts             # Constantes globales
│   ├── hooks/
│   │   └── useVoteCalculations.ts # Cálculos de votación
│   └── utils/
│       └── index.ts             # Utilidades generales
└── index.css                    # Estilos globales y variables CSS
```

## 🎨 Sistema de Colores

La aplicación utiliza un sistema de colores consistente con soporte para modo claro/oscuro:

### Paleta de Colores
- **Verde** (`#427b58` / `#8ec07c`): Estados de éxito, usuarios que votaron
- **Azul** (`#076678` / `#83a598`): Acciones primarias, promedios
- **Amarillo** (`#b57614` / `#fabd2f`): Hover de tarjetas, advertencias, usuarios esperando
- **Rojo** (`#9d0006` / `#fb4934`): Errores, valores altos, acciones destructivas
- **Magenta** (`#8f3f71` / `#d3869b`): Tarjetas seleccionadas, elementos especiales

### Variables CSS
```css
/* Colores base */
--color-light-green: #427b58;
--color-light-blue: #076678;
--color-light-yellow: #b57614;
--color-light-red: #9d0006;
--color-light-magenta: #8f3f71;

/* Estados hover */
--color-light-green-hover: #4a8962;
--color-light-blue-hover: #0a7084;
/* ... más variaciones */

/* Fondos claros */
--color-light-green-bg: #e8f5e8;
--color-light-blue-bg: #e8f4f8;
/* ... más fondos */
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd simple-planning-poker

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 5173)
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Ejecutar linting
```

## 🔧 Configuración

### Path Aliases
El proyecto utiliza path aliases configurados en `vite.config.ts`:

```typescript
resolve: {
  alias: {
    '@app': path.resolve(__dirname, './src/app'),
    '@features': path.resolve(__dirname, './src/features'),
    '@shared': path.resolve(__dirname, './src/shared'),
  },
}
```

### Variables de Entorno
La aplicación se conecta por defecto a `http://localhost:3001` para la API.

## 🎯 Características Principales

### 1. Gestión de Usuarios
- Registro simple con nombre de usuario
- Persistencia local automática
- Reconexión automática a salas activas

### 2. Salas de Estimación
- Creación de salas con títulos opcionales
- Códigos únicos de 6 caracteres
- Copia automática de códigos de sala

### 3. Votación con Tarjetas Poker
- **Diseño realista**: Proporción 2:3 como cartas reales
- **Feedback visual**: Colores dinámicos según estado
- **Animaciones suaves**: Efectos hover y selección
- **Secuencia Fibonacci**: 0-89, infinito y desconocido

### 4. Resultados en Tiempo Real
- Cálculo automático de promedio
- Identificación de valores más altos/bajos
- Colores semánticos para fácil interpretación

### 5. Lista de Participantes
- Estado visual de votación
- Indicadores animados
- Conteo en tiempo real

## 🌐 Integración con Backend

La aplicación se comunica con el backend a través de:

### REST API
- `POST /api/rooms` - Crear nueva sala
- Gestión de salas y usuarios

### WebSocket Events
```typescript
// Eventos salientes
'join-room' | 'leave-room' | 'vote' | 'reveal-votes' | 'reset-votes'

// Eventos entrantes  
'user-joined' | 'user-left' | 'vote-cast' | 'votes-revealed' 
| 'room-state-updated' | 'error'
```

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Grid Adaptativo**: 4 columnas en móvil, 6 en desktop
- **Navegación intuitiva**: Interfaces táctiles amigables

## 🔮 Próximas Mejoras

- [ ] Persistencia de salas en el servidor
- [ ] Autenticación de usuarios
- [ ] Historial de estimaciones
- [ ] Exportar resultados a PDF/CSV
- [ ] Temas personalizables
- [ ] Notificaciones push

## 📄 Licencia

Este proyecto es privado y no está disponible bajo ninguna licencia pública.
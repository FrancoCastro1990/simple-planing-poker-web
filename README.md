# Planning Poker

Una aplicación web para Planning Poker (estimación ágil) construida con React, TypeScript y Tailwind CSS.

## Características

- ✅ **Sin autenticación**: Usar localStorage para usuarios temporales
- ✅ **Salas con ID único**: URLs compartibles `/room/:id`
- ✅ **Tiempo real**: Comunicación con Socket.IO (mock implementado)
- ✅ **Votación Fibonacci**: Secuencia configurable [0,1,2,3,5,8,13,21,34,55,89,∞,?]
- ✅ **Revelado de votos**: Mostrar resultados con promedio y destacar mayor/menor
- ✅ **Responsive**: Compatible con móviles y escritorio
- ✅ **Tema claro/oscuro**: UI adaptable
- ✅ **Arquitectura limpia**: Screaming architecture con TypeScript

## Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS con tema personalizado
- **Rutas**: React Router v6
- **Estado**: Context API + Custom Hooks
- **Persistencia**: localStorage
- **Tiempo Real**: Socket.IO (preparado para backend)

## Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Construir para producción  
npm run build

# Preview de build
npm run preview
```

## Estructura del Proyecto

```
src/
├── app/                    # Configuración de la aplicación
│   ├── providers/         # Context providers
│   ├── router/           # Configuración de rutas y páginas
│   └── types/           # Tipos TypeScript globales
├── features/              # Características por dominio
│   ├── authentication/   # Manejo de usuario local
│   ├── room-management/  # Crear/unirse a salas
│   ├── voting/          # Sistema de votación
│   └── real-time/      # Comunicación Socket.IO
├── shared/               # Componentes y utilidades compartidas
│   ├── components/     # UI components reutilizables
│   ├── hooks/         # Custom hooks
│   ├── utils/        # Funciones utilitarias
│   └── constants/   # Constantes globales
```

## Uso

### 1. Configurar Usuario
- Al entrar por primera vez, introduce tu nombre
- Se guarda en localStorage para futuras sesiones

### 2. Crear o Unirse a una Sala
- **Crear**: Genera un ID único de 6 caracteres
- **Unirse**: Introduce el ID de una sala existente
- Las URLs son compartibles: `http://localhost:5173/room/ABC123`

### 3. Votar
- Selecciona una carta de la secuencia Fibonacci
- Tu estado aparece como "Voted" sin revelar el voto
- Solo puedes votar una vez por ronda

### 4. Revelar Resultados
- Cualquier participante puede presionar "Reveal Votes"
- Muestra todos los votos, promedio, y destaca mayor/menor
- Botón "Reset Votes" para nueva ronda

## Personalización

### Secuencia Fibonacci
Edita `src/shared/constants/index.ts`:
```typescript
export const FIBONACCI_SEQUENCE: FibonacciCard[] = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 'infinity', 'unknown'];
```

### Tema
Configurado en `tailwind.config.js` con colores personalizables para modo claro y oscuro.

## Backend

El frontend está preparado para conectar con un backend Socket.IO. 

**Ver [README_BACKEND.md](./README_BACKEND.md)** para especificaciones completas del servidor requerido.

### Mock Actual
Actualmente usa un mock que simula:
- Conexión a salas
- Usuarios ficticios (Alice, Bob)
- Votación local
- Estados de revelado

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting (si está configurado)

## Desarrollo

### Agregar Nueva Feature
1. Crear carpeta en `src/features/nueva-feature/`
2. Implementar hooks, componentes y tipos necesarios
3. Exportar desde `index.ts`
4. Integrar en las rutas o componentes principales

### Custom Hooks Principales
- `useLocalUser()` - Manejo de usuario localStorage
- `useRoom()` - Estado y lógica de sala (actualmente mock)
- `useVoteCalculations()` - Cálculos de votos y promedios

## Contribuir

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

## Licencia

MIT

## Roadmap

- [ ] Implementar backend Socket.IO real
- [ ] Agregar más tipos de tarjetas (T-shirt sizes)
- [ ] Historial de votaciones
- [ ] Roles de moderador
- [ ] Integración con Jira/GitHub
- [ ] PWA con notificaciones

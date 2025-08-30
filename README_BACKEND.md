# Planning Poker - Backend Specification

## Overview

Este documento especifica los requisitos del backend para la aplicación Planning Poker. El backend debe implementarse con **Socket.IO** para comunicación en tiempo real y debe manejar salas, usuarios y votaciones.

## Tecnologías Requeridas

- **Node.js** (v18+)
- **Socket.IO** (v4+)
- **Express.js** (para servidor HTTP)
- **CORS** habilitado para el frontend (localhost:5173)

## Estructura de Datos

### User
```typescript
interface User {
  id: string;           // ID único del usuario
  name: string;         // Nombre del usuario
  hasVoted: boolean;    // Si el usuario ya votó
  vote?: FibonacciCard; // Voto del usuario (opcional)
}
```

### Room
```typescript
interface Room {
  id: string;                              // ID de 6 caracteres (A-Z, 0-9)
  title?: string;                          // Título opcional de la sala
  users: User[];                           // Lista de usuarios conectados
  votes: Record<string, FibonacciCard>;    // Votos por userId
  isRevealed: boolean;                     // Si los votos están revelados
  createdAt: Date;                         // Timestamp de creación
}
```

### FibonacciCard
```typescript
type FibonacciCard = 0 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 | 89 | 'infinity' | 'unknown';
```

## Eventos Socket.IO

### Eventos del Cliente → Servidor

#### `join-room`
```typescript
{
  roomId: string;    // ID de la sala (6 caracteres)
  user: {
    id: string;      // ID único del usuario
    name: string;    // Nombre del usuario
  }
}
```
**Respuesta**: `room-state-updated` con el estado completo de la sala.

#### `leave-room`
```typescript
{
  roomId: string;    // ID de la sala
  userId: string;    // ID del usuario que sale
}
```

#### `vote`
```typescript
{
  roomId: string;         // ID de la sala
  userId: string;         // ID del usuario que vota
  vote: FibonacciCard;    // Voto seleccionado
}
```

#### `reveal-votes`
```typescript
{
  roomId: string;    // ID de la sala
}
```

#### `reset-votes`
```typescript
{
  roomId: string;    // ID de la sala
}
```

### Eventos del Servidor → Cliente

#### `room-state-updated`
Enviado a todos los usuarios en la sala cuando cambia el estado.
```typescript
{
  room: Room;    // Estado completo de la sala
}
```

#### `user-joined`
```typescript
{
  user: User;        // Usuario que se unió
  roomId: string;    // ID de la sala
}
```

#### `user-left`
```typescript
{
  userId: string;    // ID del usuario que se fue
  roomId: string;    // ID de la sala
}
```

#### `vote-cast`
```typescript
{
  userId: string;         // ID del usuario que votó
  hasVoted: boolean;      // true (no revelar el voto específico)
  roomId: string;         // ID de la sala
}
```

#### `votes-revealed`
```typescript
{
  roomId: string;
  results: {
    userId: string;
    userName: string;
    vote: FibonacciCard;
    isHighest: boolean;
    isLowest: boolean;
  }[];
  average: number;
  totalVotes: number;
}
```

#### `error`
```typescript
{
  message: string;    // Descripción del error
  code: string;       // Código de error (ej: "ROOM_NOT_FOUND")
}
```

## Lógica de Negocio

### Creación de Salas
- Las salas se crean automáticamente cuando el primer usuario se une con un `roomId` que no existe
- El `roomId` debe ser exactamente 6 caracteres (A-Z, 0-9)
- Si no se proporciona título, usar `"Room {roomId}"`

### Gestión de Usuarios
- Al conectarse, los usuarios deben unirse a una sala específica
- Un usuario puede estar en máximo una sala a la vez
- Al desconectarse (cerrar navegador), el usuario se remueve automáticamente de la sala

### Sistema de Votación
- Un usuario solo puede votar una vez por ronda
- Los votos no se revelan hasta que alguien presione "Reveal Votes"
- Solo se muestra si el usuario votó (hasVoted: true), no el voto específico
- Cualquier usuario puede revelar los votos

### Cálculo de Resultados
- **Promedio**: Solo incluir votos numéricos (excluir 'infinity' y 'unknown')
- **Highest/Lowest**: Solo aplicar a votos numéricos
- Si solo hay un voto numérico, no marcar como highest/lowest
- Redondear promedio a 2 decimales

### Limpieza de Salas
- Eliminar salas vacías después de 5 minutos sin usuarios
- Implementar heartbeat para detectar desconexiones

## Estructura del Servidor Sugerida

```
backend/
├── server.js              # Punto de entrada
├── handlers/
│   ├── roomHandlers.js    # Lógica de salas
│   ├── userHandlers.js    # Lógica de usuarios  
│   └── voteHandlers.js    # Lógica de votación
├── models/
│   ├── Room.js            # Modelo de sala
│   └── User.js            # Modelo de usuario
├── utils/
│   ├── roomUtils.js       # Utilidades de sala
│   └── voteUtils.js       # Cálculos de votos
└── package.json
```

## Comandos de Instalación

```bash
npm init -y
npm install express socket.io cors
npm install -D nodemon
```

## Configuración del Servidor Base

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Almacenamiento en memoria (para desarrollo)
const rooms = new Map();
const userRooms = new Map(); // userId -> roomId

// Configurar event handlers aquí...

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Consideraciones de Producción

Para un entorno de producción, considerar:

- **Base de datos**: Redis o MongoDB para persistir salas y usuarios
- **Escalabilidad**: Usar Redis Adapter para múltiples instancias de Socket.IO
- **Autenticación**: JWT tokens para usuarios autenticados
- **Rate limiting**: Limitar eventos por usuario para prevenir spam
- **Monitoreo**: Logs y métricas de conexiones y salas activas
- **Validación**: Validar todos los payloads de entrada
- **HTTPS**: Certificados SSL para producción

## Testing

Implementar tests para:
- Conexión y desconexión de usuarios
- Creación y limpieza de salas
- Flujo completo de votación
- Cálculos de promedios y resultados
- Manejo de errores y edge cases

## Estados de Error Comunes

- `ROOM_NOT_FOUND`: Sala no existe
- `USER_ALREADY_VOTED`: Usuario ya votó en la ronda actual
- `INVALID_ROOM_ID`: ID de sala inválido
- `INVALID_VOTE`: Voto no está en la secuencia de Fibonacci
- `NO_VOTES_TO_REVEAL`: No hay votos para revelar

---

**Nota**: Esta especificación está basada en el frontend implementado. Cualquier cambio en los eventos o estructura de datos debe sincronizarse con el cliente.
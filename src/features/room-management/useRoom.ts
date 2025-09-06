import { useState, useCallback, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Room, FibonacciCard } from '@app/types';
import type { LocalUser } from '@features/authentication/useLocalUser';

const SOCKET_URL = 'http://localhost:3001';

export const useRoom = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const roomRef = useRef<Room | null>(null);

  // Keep roomRef in sync with room state
  useEffect(() => {
    roomRef.current = room;
  }, [room]);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      autoConnect: false,
    });

    const socket = socketRef.current;

    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setError(null);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socket.on('room-state-updated', ({ room }) => {
      console.log('Room state updated:', room);
      setRoom(room);
    });

    socket.on('user-joined', ({ user, roomId }) => {
      console.log('User joined:', user, 'in room:', roomId);
    });

    socket.on('user-left', ({ userId, roomId }) => {
      console.log('User left:', userId, 'from room:', roomId);
    });

    socket.on('vote-cast', ({ userId, roomId }) => {
      console.log('Vote cast by:', userId, 'in room:', roomId);
    });

    socket.on('votes-revealed', ({ roomId, results, average, totalVotes }) => {
      console.log('Votes revealed in room:', roomId, { results, average, totalVotes });
    });

    socket.on('error', ({ message, code }) => {
      console.error('Socket error:', { message, code });
      setError(message);
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  const joinRoom = useCallback((roomId: string, user: LocalUser) => {
    setError(null);
    
    if (!socketRef.current) {
      setError('Socket not initialized');
      return;
    }

    const socket = socketRef.current;
    
    if (!socket.connected) {
      socket.connect();
    }

    // Wait for connection then join room
    if (socket.connected) {
      socket.emit('join-room', {
        roomId,
        user: {
          id: user.id,
          name: user.name,
        },
      });
    } else {
      socket.once('connect', () => {
        socket.emit('join-room', {
          roomId,
          user: {
            id: user.id,
            name: user.name,
          },
        });
      });
      socket.connect();
    }
  }, []);

  const leaveRoom = useCallback(() => {
    if (!socketRef.current || !roomRef.current) return;

    socketRef.current.emit('leave-room', {
      roomId: roomRef.current.id,
    });

    setRoom(null);
    setError(null);
    
    // Disconnect socket
    socketRef.current.disconnect();
  }, []);

  const vote = useCallback((value: FibonacciCard, userId: string) => {
    if (!socketRef.current || !roomRef.current) return;

    socketRef.current.emit('vote', {
      roomId: roomRef.current.id,
      userId,
      vote: value,
    });
  }, []);

  const revealVotes = useCallback(() => {
    if (!socketRef.current || !roomRef.current) return;

    socketRef.current.emit('reveal-votes', {
      roomId: roomRef.current.id,
    });
  }, []);

  const resetVotes = useCallback(() => {
    if (!socketRef.current || !roomRef.current) return;

    socketRef.current.emit('reset-votes', {
      roomId: roomRef.current.id,
    });
  }, []);

  return {
    room,
    isConnected,
    error,
    joinRoom,
    leaveRoom,
    vote,
    revealVotes,
    resetVotes,
  };
};
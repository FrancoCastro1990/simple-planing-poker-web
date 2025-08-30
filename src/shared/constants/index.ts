import type { FibonacciCard } from '@app/types';

export const FIBONACCI_SEQUENCE: FibonacciCard[] = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 'infinity', 'unknown'];

export const LOCAL_STORAGE_KEYS = {
  USER_NAME: 'planning-poker-user-name',
  USER_ID: 'planning-poker-user-id',
} as const;

export const ROOM_CONFIG = {
  ID_LENGTH: 6,
  MAX_TITLE_LENGTH: 100,
} as const;

export const SOCKET_CONFIG = {
  CONNECTION_TIMEOUT: 5000,
  RECONNECTION_ATTEMPTS: 3,
} as const;

export const CARD_LABELS: Record<FibonacciCard, string> = {
  0: '0',
  1: '1', 
  2: '2',
  3: '3',
  5: '5',
  8: '8',
  13: '13',
  21: '21',
  34: '34',
  55: '55',
  89: '89',
  infinity: '∞',
  unknown: '?',
};

export const ROUTES = {
  HOME: '/',
  ROOM: '/room/:id',
} as const;
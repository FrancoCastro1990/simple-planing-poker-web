import type { FibonacciCard } from '@app/types';

export const generateRoomId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateUserId = (): string => {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const isValidRoomId = (roomId: string): boolean => {
  return /^[A-Z0-9]{6}$/.test(roomId);
};

export const formatVoteForDisplay = (vote: FibonacciCard): string => {
  if (vote === 'infinity') return '∞';
  if (vote === 'unknown') return '?';
  return vote.toString();
};
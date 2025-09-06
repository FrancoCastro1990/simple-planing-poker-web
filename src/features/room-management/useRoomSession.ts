import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '@shared/constants';

export const useRoomSession = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Save current room to localStorage when in a room
  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/room\/(.+)$/);
    if (pathMatch) {
      const roomId = pathMatch[1];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_ROOM, roomId);
      } catch (error) {
        console.warn('Error saving current room to localStorage:', error);
      }
    } else {
      // Clear current room when not in a room
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_ROOM);
      } catch (error) {
        console.warn('Error removing current room from localStorage:', error);
      }
    }
  }, [location.pathname]);

  const getCurrentRoom = (): string | null => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_ROOM);
    } catch (error) {
      console.warn('Error getting current room from localStorage:', error);
      return null;
    }
  };

  const navigateToCurrentRoom = (): boolean => {
    const currentRoom = getCurrentRoom();
    if (currentRoom && location.pathname === '/') {
      navigate(`/room/${currentRoom}`);
      return true;
    }
    return false;
  };

  const clearCurrentRoom = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_ROOM);
    } catch (error) {
      console.warn('Error clearing current room from localStorage:', error);
    }
  };

  return {
    getCurrentRoom,
    navigateToCurrentRoom,
    clearCurrentRoom,
  };
};
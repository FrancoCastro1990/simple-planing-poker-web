import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '@shared/constants';
import { generateUserId } from '@shared/utils';

export interface LocalUser {
  id: string;
  name: string;
}

export const useLocalUser = () => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedName = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_NAME);
        const savedId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);

        if (savedName && savedId) {
          setUser({ id: savedId, name: savedName });
        }
      } catch (error) {
        console.warn('Error loading user from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const saveUser = (name: string): LocalUser => {
    if (!name.trim()) {
      throw new Error('Name cannot be empty');
    }

    const userId = generateUserId();
    const newUser: LocalUser = { id: userId, name: name.trim() };

    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_NAME, newUser.name);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, newUser.id);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
      throw new Error('Failed to save user');
    }
  };

  const clearUser = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_NAME);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_ID);
      setUser(null);
    } catch (error) {
      console.error('Error clearing user from localStorage:', error);
    }
  };

  const updateUserName = (name: string): void => {
    if (!user) throw new Error('No user to update');
    if (!name.trim()) throw new Error('Name cannot be empty');

    const updatedUser = { ...user, name: name.trim() };
    
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_NAME, updatedUser.name);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user name:', error);
      throw new Error('Failed to update user name');
    }
  };

  return {
    user,
    isLoading,
    saveUser,
    clearUser,
    updateUserName,
    hasUser: !!user,
  };
};
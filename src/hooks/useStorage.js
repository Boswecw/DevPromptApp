// src/hooks/useStorage.js - Custom hook for localStorage with error handling
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with comprehensive error handling
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {object} Storage utilities and state
 */
export const useStorage = (key, defaultValue = null) => {
  const [storedValue, setStoredValue] = useState(defaultValue);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if localStorage is supported
  const checkSupport = useCallback(() => {
    try {
      if (typeof window === 'undefined') return false;
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Initialize storage support and load initial value
  useEffect(() => {
    const supported = checkSupport();
    setIsSupported(supported);

    if (!supported) {
      setError('localStorage is not supported in this environment');
      setStoredValue(defaultValue);
      setIsLoading(false);
      return;
    }

    // Load initial value
    try {
      const item = localStorage.getItem(key);
      const value = item ? JSON.parse(item) : defaultValue;
      setStoredValue(value);
      setError(null);
    } catch (err) {
      console.error(`Failed to load "${key}" from localStorage:`, err);
      setError(err.message);
      setStoredValue(defaultValue);
    } finally {
      setIsLoading(false);
    }
  }, [key, defaultValue, checkSupport]);

  // Set value in localStorage
  const setValue = useCallback((value) => {
    try {
      if (!isSupported) {
        // Still update state even if localStorage isn't supported
        setStoredValue(value);
        return { success: false, error: 'localStorage not supported' };
      }

      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
      setError(null);
      
      return { success: true, error: null };
    } catch (err) {
      console.error(`Failed to save "${key}" to localStorage:`, err);
      setError(err.message);
      
      // Still update state for session-only storage
      setStoredValue(value);
      
      return { success: false, error: err.message };
    }
  }, [key, isSupported]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      if (!isSupported) {
        setStoredValue(defaultValue);
        return { success: false, error: 'localStorage not supported' };
      }

      localStorage.removeItem(key);
      setStoredValue(defaultValue);
      setError(null);
      
      return { success: true, error: null };
    } catch (err) {
      console.error(`Failed to remove "${key}" from localStorage:`, err);
      setError(err.message);
      
      // Still update state
      setStoredValue(defaultValue);
      
      return { success: false, error: err.message };
    }
  }, [key, defaultValue, isSupported]);

  // Clear all localStorage
  const clearStorage = useCallback(() => {
    try {
      if (!isSupported) {
        return { success: false, error: 'localStorage not supported' };
      }

      localStorage.clear();
      setStoredValue(defaultValue);
      setError(null);
      
      return { success: true, error: null };
    } catch (err) {
      console.error('Failed to clear localStorage:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [defaultValue, isSupported]);

  // Retry storage operations (useful after quota errors)
  const retry = useCallback(() => {
    const supported = checkSupport();
    setIsSupported(supported);
    setError(null);

    if (supported) {
      try {
        const item = localStorage.getItem(key);
        const value = item ? JSON.parse(item) : defaultValue;
        setStoredValue(value);
        return { success: true, error: null };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    }

    return { success: false, error: 'localStorage not supported' };
  }, [key, defaultValue, checkSupport]);

  // Get storage usage (if supported by browser)
  const getStorageUsage = useCallback(async () => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage,
          quota: estimate.quota,
          usedMB: (estimate.usage / 1024 / 1024).toFixed(2),
          quotaMB: (estimate.quota / 1024 / 1024).toFixed(2),
          percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(1)
        };
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  return {
    // State
    value: storedValue,
    isSupported,
    error,
    isLoading,
    
    // Actions
    setValue,
    removeValue,
    clearStorage,
    retry,
    getStorageUsage,
    
    // Utilities
    isQuotaError: error && error.includes('QuotaExceededError'),
    isCorrupted: error && (error.includes('parse') || error.includes('JSON')),
    isCriticalError: error && (
      error.includes('QuotaExceededError') || 
      error.includes('not supported') ||
      error.includes('parse') ||
      error.includes('JSON')
    )
  };
};

// Hook specifically for arrays (like saved prompts)
export const useArrayStorage = (key, defaultValue = []) => {
  const storage = useStorage(key, defaultValue);
  
  const addItem = useCallback((item) => {
    const newArray = Array.isArray(storage.value) ? [item, ...storage.value] : [item];
    return storage.setValue(newArray);
  }, [storage]);
  
  const removeItem = useCallback((predicate) => {
    if (!Array.isArray(storage.value)) return { success: false, error: 'Value is not an array' };
    
    const newArray = storage.value.filter(item => !predicate(item));
    return storage.setValue(newArray);
  }, [storage]);
  
  const updateItem = useCallback((predicate, updater) => {
    if (!Array.isArray(storage.value)) return { success: false, error: 'Value is not an array' };
    
    const newArray = storage.value.map(item => 
      predicate(item) ? updater(item) : item
    );
    return storage.setValue(newArray);
  }, [storage]);
  
  const limitSize = useCallback((maxSize) => {
    if (!Array.isArray(storage.value)) return { success: false, error: 'Value is not an array' };
    
    if (storage.value.length > maxSize) {
      const limitedArray = storage.value.slice(0, maxSize);
      return storage.setValue(limitedArray);
    }
    return { success: true, error: null };
  }, [storage]);

  return {
    ...storage,
    addItem,
    removeItem,
    updateItem,
    limitSize,
    length: Array.isArray(storage.value) ? storage.value.length : 0
  };
};

export default useStorage;
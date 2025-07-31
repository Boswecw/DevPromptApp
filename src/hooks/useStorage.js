// ✅ FINAL useStorage.js - Safe, stable, array-supporting localStorage hook
import { useState, useEffect, useCallback } from 'react';

export const useStorage = (key, defaultValue = null) => {
  const [storedValue, setStoredValue] = useState(defaultValue);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const supported = checkSupport();
    setIsSupported(supported);

    if (!supported) {
      setError('localStorage is not supported in this environment');
      setStoredValue(defaultValue);
      setIsLoading(false);
      return;
    }

    try {
      const item = localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : defaultValue;

      setStoredValue(prev => (
        JSON.stringify(prev) !== JSON.stringify(parsed) ? parsed : prev
      ));
      setError(null);
    } catch (err) {
      console.error(`Failed to load "${key}" from localStorage:`, err);
      setError(err.message);
      setStoredValue(defaultValue);
    } finally {
      setIsLoading(false);
    }
  }, [key, defaultValue, checkSupport]);

  const setValue = useCallback((value) => {
    try {
      if (!isSupported) {
        setStoredValue(value);
        return { success: false, error: 'localStorage not supported' };
      }

      const stringified = JSON.stringify(value);
      const existing = localStorage.getItem(key);

      if (existing !== stringified) {
        localStorage.setItem(key, stringified);
        setStoredValue(value);
      }

      return { success: true };
    } catch (err) {
      console.error(`Failed to save "${key}" to localStorage:`, err);
      setError(err.message);
      setStoredValue(value);
      return { success: false, error: err.message };
    }
  }, [key, isSupported]);

  const removeValue = useCallback(() => {
    try {
      if (!isSupported) return { success: false, error: 'localStorage not supported' };
      localStorage.removeItem(key);
      setStoredValue(defaultValue);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [key, defaultValue, isSupported]);

  const clearStorage = useCallback(() => {
    try {
      if (!isSupported) return { success: false, error: 'localStorage not supported' };
      localStorage.clear();
      setStoredValue(defaultValue);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [defaultValue, isSupported]);

  const retry = useCallback(() => {
    const supported = checkSupport();
    setIsSupported(supported);
    setError(null);

    if (supported) {
      try {
        const item = localStorage.getItem(key);
        const parsed = item ? JSON.parse(item) : defaultValue;
        setStoredValue(parsed);
        return { success: true };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: 'localStorage not supported' };
  }, [key, defaultValue, checkSupport]);

  const getStorageUsage = useCallback(async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        usedMB: (estimate.usage / 1024 / 1024).toFixed(2),
        quotaMB: (estimate.quota / 1024 / 1024).toFixed(2),
        percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(1)
      };
    }
    return null;
  }, []);

  return {
    value: storedValue,
    isSupported,
    error,
    isLoading,
    setValue,
    removeValue,
    clearStorage,
    retry,
    getStorageUsage,
    isQuotaError: error?.includes('QuotaExceededError'),
    isCorrupted: error?.includes('JSON'),
    isCriticalError: error && (
      error.includes('QuotaExceededError') ||
      error.includes('not supported') ||
      error.includes('JSON')
    )
  };
};

// ✅ useArrayStorage for managing array data (like saved prompts)
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
    const newArray = storage.value.map(item => predicate(item) ? updater(item) : item);
    return storage.setValue(newArray);
  }, [storage]);

  const limitSize = useCallback((maxSize) => {
    if (!Array.isArray(storage.value)) return { success: false, error: 'Value is not an array' };
    if (storage.value.length > maxSize) {
      const limited = storage.value.slice(0, maxSize);
      return storage.setValue(limited);
    }
    return { success: true };
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

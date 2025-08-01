// src/components/PWAInstall.jsx
import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Monitor, Wifi, WifiOff, RefreshCw } from 'lucide-react';

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      setShowInstallPrompt(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setShowInstallPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleUpdateClick = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    }
    window.location.reload();
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
  };

  return (
    <div className="pwa-container">
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">You're offline - App still works!</span>
        </div>
      )}

      {/* Update Available Notification */}
      {updateAvailable && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">New version available!</span>
          </div>
          <button
            onClick={handleUpdateClick}
            className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Update
          </button>
        </div>
      )}

      {/* Install Prompt */}
      {showInstallPrompt && isInstallable && !isInstalled && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5" />
                <h3 className="font-semibold">Install DevPrompt Generator</h3>
              </div>
              <p className="text-sm opacity-90 mb-3">
                Install as an app for faster access, offline support, and native experience!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </button>
                <button
                  onClick={dismissInstallPrompt}
                  className="text-white border border-white/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Install Button in Header (for browsers that don't show prompt automatically) */}
      {isInstallable && !showInstallPrompt && !isInstalled && (
        <button
          onClick={handleInstallClick}
          className="hidden md:flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors"
          title="Install as App"
        >
          <Download className="w-4 h-4" />
          Install
        </button>
      )}

      {/* PWA Status Indicator */}
      {isInstalled && (
        <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded text-xs">
          <Monitor className="w-3 h-3" />
          <span>App Mode</span>
        </div>
      )}

      {/* Network Status */}
      <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded text-xs">
        {isOnline ? (
          <>
            <Wifi className="w-3 h-3 text-green-600" />
            <span className="text-green-600 dark:text-green-400">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 text-orange-600" />
            <span className="text-orange-600 dark:text-orange-400">Offline</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PWAInstall;
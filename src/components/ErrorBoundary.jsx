// src/components/ErrorBoundary.jsx
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    const isDevelopment = import.meta.env?.DEV || false;
    if (isDevelopment) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env?.DEV || false;
      
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mx-auto transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reload App
            </button>
            
            {/* Development Error Details */}
            {isDevelopment && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-red-600 font-medium hover:text-red-700">
                  Error Details (Dev Mode)
                </summary>
                <div className="mt-2 text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded border">
                  <div className="font-medium text-red-800 dark:text-red-300 mb-2">
                    Error:
                  </div>
                  <pre className="whitespace-pre-wrap text-red-700 dark:text-red-400 mb-3">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                  
                  <div className="font-medium text-red-800 dark:text-red-300 mb-2">
                    Component Stack:
                  </div>
                  <pre className="whitespace-pre-wrap text-red-600 dark:text-red-400 text-xs">
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
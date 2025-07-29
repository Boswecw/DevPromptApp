// In your src/App.jsx
import ErrorBoundary from './components/ErrorBoundary';
import DevPromptApp from './DevPromptApp';

function App() {
  return (
    <ErrorBoundary>
      <DevPromptApp />
    </ErrorBoundary>
  );
}

export default App;
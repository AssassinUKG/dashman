import { Dashboard } from './components/Dashboard';
import { FaviconManager } from './components/FaviconManager';
import { ThemeProvider } from './components/ThemeProvider';
import './App.css';
import './styles/themes.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <FaviconManager />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;

import './App.css';
import { WeatherProvider } from "./contexts/WeatherContext";
import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    <WeatherProvider>
        <div>
            <WeatherDetails/>
        </div>      
    </WeatherProvider>
  );
}

export default App;

import Main from "./Components/Main/Main";
import Sidebar from "./Components/Sidebar/Sidebar";
import {LocationContextProvider} from "./Store/location-context"
import { TemperatureContextProvider } from "./Store/temperature-context";

function App() {
  return (
    <div className="content">
      <LocationContextProvider>
      <TemperatureContextProvider>
        <Sidebar />
        <Main />
      </TemperatureContextProvider>
      </LocationContextProvider>
    </div>
  );
}

export default App;

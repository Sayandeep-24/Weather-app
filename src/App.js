import Main from "./Components/Main/Main";
import Sidebar from "./Components/Sidebar/Sidebar";
import {LocationContextProvider} from "./Store/location-context"

function App() {
  return (
    <div className="content">
      <LocationContextProvider>
        <Sidebar />
        <Main />
      </LocationContextProvider>
    </div>
  );
}

export default App;

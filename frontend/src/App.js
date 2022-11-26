
import './Common.css';
import './App.css';

import LeftPanel from './components/LeftPanel/LeftPanel';
import MainView from './components/MainView';
import LoginScreen from './components/LoginScreen';

function App() {
  return (
    <div className="App">
      <LeftPanel/> 
      <MainView/>
      {/* <LoginScreen/> */}
    </div>
  );
}

export default App;

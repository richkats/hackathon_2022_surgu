
import './Common.css';
import './App.css';

import LeftPanel from './components/LeftPanel/LeftPanel';
import MainView from './components/MainView';
import LoginScreen from './components/LoginScreen';

import {useState} from 'react'

function App() {
  const [view, setview] = useState('Main');

  return (
    <div className="App">
      {view === 'Login' ? <LoginScreen viewSetter={setview}/> : null}
      {view === 'Main' ? <MainView viewSetter={setview}/> : null}
      {/* <MainView/> */}
      
    </div>
  );
}

export default App;

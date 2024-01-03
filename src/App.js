import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import MiniDrawer from './components/text1';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/token' element={<MiniDrawer/>}/>
      </Routes>
    </div>
  );
}

export default App;

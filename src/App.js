import React from 'react';
import './App.css';
import {useLocation} from 'react-router';
import Nav from './Components/nav/Nav';
import routes from './routes';

function App() {
  let location = useLocation();
  console.log(location)
  return (
    <div className="App">
      {location.pathname==='/'?null:location.pathname==='/register'?null:<Nav/>}
      {routes}
    </div>
  );
}

export default App;

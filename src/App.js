import React from 'react';
import './App.css';
// import {useLocation} from 'react-router';
import {withRouter} from 'react-router-dom';
import Nav from './Components/nav/Nav';
import routes from './routes';

function App(props) {
  // let location = useLocation();
  // console.log(location)
  console.log(props)
  return (
    <div className="App">
      {props.location.pathname==='/'?null:props.location.pathname==='/register'?null:<Nav/>}
      {routes}
    </div>
  );
}

export default withRouter(App);

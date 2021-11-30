import React from 'react'


import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";





import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header.js'
import Home from './components/Home'
import Details from './components/Details';
import Login from './components/Login';


function App() {
  
  return (
    <Router>
      <div className="App">
      
        <Header />
        
        
        
        <Route exact path = "/" component={Home} />
        <Route exact path = "/details/:id" component={Details} />
        <Route exact path = "/login" component={Login} />
      </div>
    </Router>
  );
}

export default App

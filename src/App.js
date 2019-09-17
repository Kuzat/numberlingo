import React from 'react';
import './App.css';
import './components/Home/Home';
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/learn/:language" component={Game}/>
        </div>
      </BrowserRouter>
  );
}

export default App;

import React from 'react';

import './App.css';
import Meme from './components/Meme';
import { Switch, Route } from 'react-router-dom';
import MemeView from './components/MemeView';

function App() {
  return (
    <div className="app">
      
      <Switch>
        <Route exact path ='/'>
          <Meme/>
        </Route>
        <Route path ='/view'>
          <MemeView/>
        </Route>
      </Switch>
       
    </div>
  );
}

export default App;

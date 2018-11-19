import React, { Component } from 'react';
import './App.css';
import Canvas from './components/draw_3d_models'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
      </div>
    );
  }
}


export default App;

import React from 'react';
import Footer from '../Footer';
import DropzoneContainer from '../../containers/DropzoneContainer';

import './App.css';
import Rain from './rainIndex.js';

class App extends React.Component {
  componentDidMount()
  {
    Rain.init();
  }

  render() {
    return (
      <div className="App">
        <span id="fishupTitle"></span>
        <canvas id="canvas">Canvas is not supported in your browser</canvas>
        <DropzoneContainer/>
        <Footer/>
      </div>
    );
  }
}

export default App;

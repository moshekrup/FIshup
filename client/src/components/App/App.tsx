import React from 'react';
import Footer from '../Footer';
import DropzoneContainer from '../../containers/DropzoneContainer';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <span id="fishupTitle"></span>
        <DropzoneContainer/>
        <Footer/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Projects from './components/Projects';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Projects />
      </div>
    );
  }
}

export default App;

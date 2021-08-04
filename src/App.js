import React, { Component } from 'react';
import ProjectsList from './components/ProjectsList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ProjectsList />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldName: this.props.name,
      name: this.props.name,
      editMode: false,
    }
  }

  displayProject() {
    return (
      <div>
        <p onClick={() => this.props.selectProject(this.state.name)}>{this.state.name}</p>
        <button onClick={() => this.editProjectName()}>Edit</button>
      </div>
    );
  }

  displayEditProject() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
        <button onClick={e => this.submitEditProjectName(e)}>Submit</button>
        <button>Delete</button>
      </div>
    );
  }

  editProjectName() {
    this.setState({
      editMode: true
    });
  }

  submitEditProjectName() {
    this.props.submitEditProjectName(this.state.name, this.state.oldName);

    this.setState({
      oldName: this.state.name,
      editMode: false
    });
  }

  render() {
    return(
      <div>
        {this.state.editMode ? this.displayEditProject() : this.displayProject()}
      </div>
    );
  }
}

export default Project;

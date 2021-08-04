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
      <div key={this.props.i}>
        <p onClick={() => this.props.selectProject(this.state.name)}>{this.state.name}</p>
        <button onClick={() => this.editProjectName()}>Edit</button>
      </div>
    );
  }

  displayEditProject() {
    return (
      <div key={this.props.i}>
        <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
        <button onClick={e => this.submitEditProjectName(e)}>Submit</button>
        <button onClick={e => this.deleteProject(e)}>Delete</button>
      </div>
    );
  }

  editProjectName() {
    this.setState({
      editMode: true
    });
  }

  submitEditProjectName(e) {
    const index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
    this.props.submitEditProjectName(this.state.name, index);

    this.setState({
      oldName: this.state.name,
      editMode: false
    });
  }

  deleteProject(e) {
    const index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
    this.props.deleteProject(this.state.name, index);

    setTimeout(() => {
      this.setState({
        oldName: this.props.name,
        name: this.props.name,
        editMode: false,
      });
    }, 0)
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

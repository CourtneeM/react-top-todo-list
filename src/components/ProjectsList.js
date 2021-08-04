import React, { Component } from 'react';
import Project from './Project';
import TodoList from './TodoList';

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProjectInput: '',
      projects: {'Default Project': [{title: 'ayy', description: 'ohhh', dueDate: 'tomorrow', priority: 1, notes: 'do it now', completed: false}]},
      selectedProjectName: 'Default Project',
    }

    this.selectProject = this.selectProject.bind(this);
    this.submitEditProjectName = this.submitEditProjectName.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  addProject() {
    const projectsCopy = Object.assign({}, this.state.projects);
    projectsCopy[this.state.newProjectInput] = [];

    this.setState({
      newProjectInput: '',
      projects: projectsCopy
    });
  }

  selectProject(projectName) {
    this.setState({
      selectedProjectName: projectName,
    });
  }

  displayProjects() {
    return (
      <div>
        {
          Object.keys(this.state.projects).map((projectName, i) => {
            return <Project
                     name={projectName}
                     submitEditProjectName={this.submitEditProjectName}
                     selectProject={this.selectProject}
                    />
          })
        }
      </div>
    );
  }

  submitEditProjectName(newName, oldName) {
    const projectsCopy = Object.assign({}, this.state.projects);
    const oldProjectValues = projectsCopy[oldName];
    
    projectsCopy[newName] = oldProjectValues;
    delete projectsCopy[oldName];

    this.setState({
      projects: projectsCopy,
      selectedProjectName: this.state.selectedProjectName === oldName ? newName : this.state.selectedProjectName
    });
  }

  addTodo(newTodo) {
    const projectsCopy = Object.assign({}, this.state.projects);
    const updatedProjectValues = this.state.projects[this.state.selectedProjectName];
    updatedProjectValues.push(newTodo);
    projectsCopy[this.state.selectedProjectName] = updatedProjectValues

    this.setState({
      projects: projectsCopy
    });
  }

  editTodo(updatedTodo, index) {
    const projectsCopy = Object.assign({}, this.state.projects);
    const updatedProjectValues = this.state.projects[this.state.selectedProjectName];
    updatedProjectValues.splice(index, 1, updatedTodo);
    projectsCopy[this.state.selectedProjectName] = updatedProjectValues;

    this.setState({
      projects: projectsCopy
    });
  }

  deleteTodo(index) {
    const projectsCopy = Object.assign({}, this.state.projects);
    const updatedProjectValues = this.state.projects[this.state.selectedProjectName];
    updatedProjectValues.splice(index, 1);
    projectsCopy[this.state.selectedProjectName] = updatedProjectValues;

    this.setState({
      projects: projectsCopy,
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Project Name"
          value={this.state.newProjectInput}
          onChange={e => this.setState({newProjectInput: e.target.value})}
        />
        <button onClick={() => this.addProject()}>Add Project</button>

        {this.displayProjects()}

        <TodoList
          selectedProjectName={this.state.selectedProjectName}
          selectedProject={this.state.projects[this.state.selectedProjectName]}
          addTodo={this.addTodo}
          editTodo={this.editTodo}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

const styles = {
  projectContainer: {
    display: 'flex',
  }
}

export default ProjectsList;

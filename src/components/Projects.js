import React, { Component } from 'react';
import TodoList from './TodoList';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProjectInput: '',
      projects: {'Default Project': [{title: 'ayy', description: 'ohhh', dueDate: 'tomorrow', priority: 1, notes: 'do it now', completed: false}]},
      selectedProject: {'Default Project': [{title: 'ayy', description: 'ohhh', dueDate: 'tomorrow', priority: 1, notes: 'do it now', completed: false}]}
    }

    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  addProject() {
    const projectsCopy = Object.assign({}, this.state.projects);
    projectsCopy[this.state.newProjectInput] = [];

    this.setState({
      newProjectInput: '',
      projects: projectsCopy
    });
  }

  selectProject(project) {
    this.setState({
      selectedProject: project
    });
  }

  displayProjects() {
    return (
      <div>
        {
          Object.keys(this.state.projects).map((projectName, i) => {
            return <p key={i} onClick={() => {
              this.selectProject({[projectName]: this.state.projects[projectName]})
            }}>{projectName}</p>
          })
        }
      </div>
    );
  }

  addTodo(newTodo) {
    const projectsCopy = Object.assign({}, this.state.projects);
    const updatedProjectValues = Object.values(this.state.selectedProject)[0];
    updatedProjectValues.push(newTodo);
    projectsCopy[Object.keys(this.state.selectedProject)[0]] = updatedProjectValues

    this.setState({
      projects: projectsCopy
    });
  }

  editTodo(updatedTodo, index) {
    const projectsCopy = Object.assign({}, this.state.projects);
    const updatedProjectValues = Object.values(this.state.selectedProject)[0];
    updatedProjectValues.splice(index, 1, updatedTodo);
    projectsCopy[Object.keys(this.state.selectedProject)[0]] = updatedProjectValues;

    this.setState({
      projects: projectsCopy
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
          selectedProject={this.state.selectedProject}
          addTodo={this.addTodo}
          editTodo={this.editTodo}
        />
      </div>
    );
  }
}

export default Projects;

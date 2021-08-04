import React, { Component } from 'react';
import Project from './Project';
import TodoList from './TodoList';

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProjectInput: '',
      projects: [{'Default Project': [{title: 'ayy', description: 'ohhh', dueDate: 'tomorrow', priority: 1, notes: 'do it now', completed: false}]}],
      selectedProjectName: 'Default Project',
    }

    this.selectProject = this.selectProject.bind(this);
    this.submitEditProjectName = this.submitEditProjectName.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  addProject() {
    const projectsCopy = [...this.state.projects];
    const newProjectName = this.state.newProjectInput;
    projectsCopy.push({[newProjectName]: []});

    this.setState(prevState => ({
      newProjectInput: '',
      projects: projectsCopy,
      selectedProjectName: projectsCopy.length === 1 ? newProjectName : prevState.selectedProjectName
    }));
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
          this.state.projects.map((project, i) => {
            return <Project
                     key={i}
                     name={Object.keys(project)[0]}
                     selectProject={this.selectProject}
                     submitEditProjectName={this.submitEditProjectName}
                     deleteProject={this.deleteProject}
                   />
          })
        }
      </div>
    );
  }

  submitEditProjectName(newName, index) {
    const projectsCopy = [...this.state.projects];
    const oldProject = projectsCopy[index];
    
    projectsCopy.splice(index, 1, {[newName]: Object.values(oldProject)});

    this.setState({
      projects: projectsCopy,
      selectedProjectName: this.state.selectedProjectName === Object.keys(oldProject)[0] ? newName : this.state.selectedProjectName
    });
  }

  deleteProject(projectName, index) {
    const projectsCopy = [...this.state.projects];
    projectsCopy.splice(index, 1);

    this.setState({
      projects: projectsCopy,
      selectedProjectName: this.state.selectedProjectName === projectName ? projectsCopy[0] : this.state.selectedProjectName
    });
  }

  addTodo(newTodo) {
    const projectsCopy = [...this.state.projects];
    const projectIndex = projectsCopy.indexOf(projectsCopy.filter(project => Object.keys(project)[0] === this.state.selectedProjectName)[0]);
    
    projectsCopy[projectIndex][this.state.selectedProjectName].push(newTodo);

    this.setState({
      projects: projectsCopy
    });
  }

  editTodo(updatedTodo, index) {
    const projectsCopy = [...this.state.projects];
    const projectIndex = projectsCopy.indexOf(projectsCopy.filter(project => Object.keys(project)[0] === this.state.selectedProjectName)[0]);

    projectsCopy[projectIndex][this.state.selectedProjectName].splice(index, 1, updatedTodo);

    this.setState({
      projects: projectsCopy
    });
  }

  deleteTodo(index) {
    const projectsCopy = [...this.state.projects];
    const projectIndex = projectsCopy.indexOf(projectsCopy.filter(project => Object.keys(project)[0] === this.state.selectedProjectName)[0]);

    projectsCopy[projectIndex][this.state.selectedProjectName].splice(index, 1);

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
          selectedProject={Object.values(this.state.projects.filter(project => Object.keys(project)[0] === this.state.selectedProjectName)[0])[0]}
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

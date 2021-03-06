import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      notes: '',
    }

    this.submitEditTodo = this.submitEditTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  displayTodos() {
    return (
      <div>
        {
          this.props.selectedProject.map((todo, i) => {
            return <Todo key={i} todo={todo} submitEditTodo={this.submitEditTodo} deleteTodo={this.deleteTodo}/>
          })
        }
      </div>
    );
  }

  updateInput(fieldName, value) {
    this.setState({
      [fieldName]: value
    });
  }

  addTodo() {
    this.props.addTodo(this.state);

    this.setState({
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      notes: ''
    });
  }

  submitEditTodo(updatedTodo, index) {
    this.props.editTodo(updatedTodo, index);
  }

  deleteTodo(index) {
    this.props.deleteTodo(index);
  }

  render() {
    return (
      <div>
        <h2>{this.props.selectedProjectName}</h2>
        <div className="new-todo-form">
          <input type="text" placeholder="Title" value={this.state.title} onChange={e => this.updateInput('title', e.target.value)}/>
          <input type="text" placeholder="Description" value={this.state.description} onChange={e => this.updateInput('description', e.target.value)} />
          <input type="text" placeholder="Due Date" value={this.state.dueDate} onChange={e => this.updateInput('dueDate', e.target.value)} />
          <input type="text" placeholder="Priority" value={this.state.priority} onChange={e => this.updateInput('priority', e.target.value)} />
          <input type="text" placeholder="Notes" value={this.state.notes} onChange={e => this.updateInput('notes', e.target.value)} />
          <button onClick={() => this.addTodo()}>Add Todo</button>
        </div>

        <div className="todo-header" style={styles.todoHeader}>
          <p>Title</p>
          <p>Description</p>
          <p>Due Date</p>
          <p>Priority</p>
          <p>Notes</p>
          <p>Completed</p>
          <p></p>
          <p></p>
        </div>
        {this.props.selectedProject ? this.displayTodos() : null}
      </div>
    );
  }
}

const styles = {
  todoHeader: {
    display: 'flex',
    justifyContent: 'space-around',
  }
}

export default TodoList;

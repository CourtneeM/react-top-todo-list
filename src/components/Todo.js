import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.todo.title,
      description: this.props.todo.description,
      dueDate: this.props.todo.dueDate,
      priority: this.props.todo.priority,
      notes: this.props.todo.notes,
      editMode: false,
    }
  }

  displayTodo() {
    return (
      <div className="todo-container" style={styles.todo}>
        <p>{this.props.todo.title}</p>
        <p>{this.props.todo.description}</p>
        <p>{this.props.todo.dueDate}</p>
        <p>{this.props.todo.priority}</p>
        <p>{this.props.todo.notes}</p>
        <p>{this.props.todo.completed ? 'True' : 'False'}</p>
        <button onClick={() => this.editTodo()}>Edit</button>
      </div>
    );
  }

  updateInput(fieldName, value) {
    this.setState({
      [fieldName]: value
    });
  }

  editTodo() {
    this.setState({
      editMode: true,
    });
  }

  submitEditTodo(e) {
    const index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
    this.props.submitEditTodo(this.state, index);

    this.setState({
      editMode: false,
    });
  }

  deleteTodo(e) {
    const index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement);
    this.props.deleteTodo(index);

    this.setState({
      editMode: false,
    });
  }

  displayEditTodo() {
    return (
      <div>
        <input type="text" value={this.state.title} onChange={e => this.updateInput('title', e.target.value)} />
        <input type="text" value={this.state.description} onChange={e => this.updateInput('description', e.target.value)} />
        <input type="text" value={this.state.dueDate} onChange={e => this.updateInput('dueDate', e.target.value)} />
        <input type="text" value={this.state.priority} onChange={e => this.updateInput('priority', e.target.value)} />
        <input type="text" value={this.state.notes} onChange={e => this.updateInput('notes', e.target.value)} />
        <button onClick={e => this.submitEditTodo(e)}>Submit</button>
        <button onClick={e => this.deleteTodo(e)}>Delete</button>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.state.editMode ? this.displayEditTodo() : this.displayTodo()}        
      </>
    );
  }
}

const styles = {
  todo: {
    display: 'flex',
    justifyContent: 'space-around',
  }
}

export default Todo;

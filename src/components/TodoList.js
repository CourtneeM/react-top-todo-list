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
      editMode: false,
    }

    this.editTodo = this.editTodo.bind(this);
    this.submitEditTodo = this.submitEditTodo.bind(this);
  }

  displayTodos() {
    return (
      <div>
        {
          Object.values(this.props.selectedProject)[0].map(todo => {
            return <Todo todo={todo} editTodo={this.editTodo} editMode={this.state.editMode} submitEditTodo={this.submitEditTodo}/>
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

  editTodo() {
    this.setState({
      editMode: true,
    })
  }

  submitEditTodo(updatedTodo, index) {
    this.setState({
      editMode: false,
    }, () => this.props.editTodo(updatedTodo, index));
  }

  render() {
    return (
      <div>
        <div className="new-todo-form">
          <input type="text" placeholder="Title" value={this.state.title} onChange={e => this.updateInput('title', e.target.value)}/>
          <input type="text" placeholder="Description" value={this.state.description} onChange={e => this.updateInput('description', e.target.value)} />
          <input type="text" placeholder="Due Date" value={this.state.dueDate} onChange={e => this.updateInput('due date', e.target.value)} />
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
        {this.displayTodos()}
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

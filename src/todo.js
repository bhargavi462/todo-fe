import React, { Component } from 'react';
import './todo.css'; // Make sure to create this CSS file and add your styles

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: this.getTodoListFromLocalStorage(),
      userInputValue: '',
    };
  }

  getTodoListFromLocalStorage = () => {
    const stringifiedTodoList = localStorage.getItem('todoList');
    return stringifiedTodoList ? JSON.parse(stringifiedTodoList) : [];
  };

  saveTodoListToLocalStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
  };

  handleInputChange = (event) => {
    this.setState({ userInputValue: event.target.value });
  };

  onAddTodo = () => {
    const { userInputValue, todoList } = this.state;

    if (userInputValue.trim() === '') {
      alert('Enter Valid Text');
      return;
    }

    const newTodo = {
      text: userInputValue,
      uniqueNo: todoList.length + 1,
      isChecked: false,
    };

    this.setState(
      (prevState) => ({
        todoList: [...prevState.todoList, newTodo],
        userInputValue: '',
      }),
      this.saveTodoListToLocalStorage
    );
  };

  onTodoStatusChange = (uniqueNo) => {
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.map((todo) =>
          todo.uniqueNo === uniqueNo ? { ...todo, isChecked: !todo.isChecked } : todo
        ),
      }),
      this.saveTodoListToLocalStorage
    );
  };

  onDeleteTodo = (uniqueNo) => {
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.filter((todo) => todo.uniqueNo !== uniqueNo),
      }),
      this.saveTodoListToLocalStorage
    );
  };

  render() {
    const { todoList, userInputValue } = this.state;

    return (
      <div className="todos-bg-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="todos-heading">Todos</h1>
              <h1 className="create-task-heading">
                Create <span className="create-task-heading-subpart">Task</span>
              </h1>
              <input
                type="text"
                id="todoUserInput"
                className="todo-user-input"
                placeholder="What needs to be done?"
                value={userInputValue}
                onChange={this.handleInputChange}
              />
              <button className="button" id="addTodoButton" onClick={this.onAddTodo}>
                Add
              </button>
              <h1 className="todo-items-heading">
                My <span className="todo-items-heading-subpart">Tasks</span>
              </h1>
              <ul className="todo-items-container" id="todoItemsContainer">
                {todoList.map((todo) => (
                  <li key={todo.uniqueNo} className="todo-item-container d-flex flex-row">
                    <input
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => this.onTodoStatusChange(todo.uniqueNo)}
                      className="checkbox-input"
                    />
                    <label
                      className={`checkbox-label ${todo.isChecked ? 'checked' : ''}`}
                    >
                      {todo.text}
                    </label>
                    <div className="delete-icon-container">
                      <i
                        className="far fa-trash-alt delete-icon"
                        onClick={() => this.onDeleteTodo(todo.uniqueNo)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button className="button" id="saveTodoButton" onClick={this.saveTodoListToLocalStorage}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;

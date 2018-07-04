import React, { Component } from 'react';
import TodolistTemplate from './components/TodolistTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

  id = 3

  state = {
    input: '',
    todos: [
      { id: 0, text: '리액트 소개', checked: false },
      { id: 1, text: '리액트 소개', checked: true },
      { id: 2, text: '리액트 소개', checked: false }
    ],
    color: ''
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos, color } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color: color
      })
    });
  }

  handlePalette = (color) => {
    this.setState({
      color: color
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      this.handleCreate();
    }
  }

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handlePalette
    } = this;

    return (
      <TodolistTemplate form = {(
        <Form
          value = { input }
          onKeyPress = { handleKeyPress }
          onChange = { handleChange }
          onCreate = { handleCreate }
          color = { color }
          />
          )} palette = { <Palette colors = { colors } selected = { color } onSelect = { handlePalette }/> }>
          <TodoItemList todos = { todos } onToggle = { handleToggle } onRemove = { handleRemove } palette = { handlePalette }/>
      </TodolistTemplate>
    );
  }
}

export default App;

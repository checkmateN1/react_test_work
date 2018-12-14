// Core
import React, { Component } from 'react';


class Name extends Component {
  state = {
    name: '',
    placeholder: 'Your name',
  };

  updateName = (e) => {
    let name = e.target.value;

    if (name.length > 60) {
      return false;
    }
    this.setState({name});
  };

  validate = () => {
    let { name } = this.state;
    let el = document.getElementById('user-name');

    if (name && name.length > 2) {
      this.props.setName(name);
      el.classList.remove('alarm');
    } else {
      el.classList.add('alarm');
      this.setState({placeholder: ''});
      this.props.setName('');
    }
  };

  render() {
    return (
      <fieldset id='user-name'>
        <legend>Name</legend>
        <input
          type='text'
          placeholder={this.state.placeholder}
          autoComplete='off'
          value={this.state.name}
          onChange={this.updateName}
          onBlur={this.validate}
        />
      </fieldset>
    );
  }
}

export default Name;


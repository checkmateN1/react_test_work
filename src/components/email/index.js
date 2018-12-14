// Core
import React, { Component } from 'react';


class Email extends Component {
  state = {
    email: '',
    placeholder: 'Your email',
  };

  update = (e) => {
    let email = e.target.value;

    if (email.length > 100) {
      return false;
    }
    this.setState({email});
    //this.props.setEmail(value);
  };

  validate = () => {
    let { email } = this.state;
    let el = document.getElementById('user-email');
    let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (email.search(reg) === 0) {
      this.props.setEmail(email);
      el.classList.remove('alarm');
    } else {
      this.props.setEmail('');
      this.setState({placeholder: ''});
      el.classList.add('alarm');
    }
  };

  render() {
    return (
      <fieldset id='user-email'>
        <legend>Email</legend>
        <input
          type="text"
          placeholder={this.state.placeholder}
          autoComplete='off'
          value={this.state.email}
          onChange={this.update}
          onBlur={this.validate}
        />
      </fieldset>
    );
  }
}

export default Email;


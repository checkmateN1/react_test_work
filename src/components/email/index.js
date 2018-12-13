// Core
import React, { Component } from 'react';


class Email extends Component {

  updateEmail = (e) => {
    let email = e.target.value;

    if (email.length > 100) {
      return false
    }
    this.props.setEmail(email);
  };

  validateEmail = () => {
    if (this.props.email) {
      let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      alert(this.props.email.search(reg));
    }
  };

  render() {
    return (
      <fieldset>
        <legend>Email</legend>
        <input
          type="text"
          placeholder='Your email'
          autoComplete='off'
          value={this.props.email}
          onChange={this.updateEmail}
          onBlur={this.validateEmail}
        />
      </fieldset>
    );
  }
}

export default Email;


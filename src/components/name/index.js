// Core
import React, { Component } from 'react';


class Name extends Component {

  updateName = (e) => {
    let name = e.target.value;

    if (name.length > 60) {
      return false;
    }
    this.props.setName(name);
  };

  render() {
    return (
      <fieldset>
        <legend>Name</legend>
        <input
            type="text"
            placeholder='Your name'
            autoComplete='off'
            value={this.props.name}
            onChange={this.updateName}
        />
      </fieldset>
    );
  }
}

export default Name;


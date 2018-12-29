// Core
import React, { Component } from 'react';


class Position extends Component {

  updatePosition = (e) => {
    const val = e.target.value;

    this.props.positions.forEach(position => {
      if (position.name === val) {this.props.setPosition(position.id);}
    });
  };

  render() {
    const positions = this.props.positions.map(position => (
        <option key={position.id}>{position.name}</option>
    ));

    return (
        <select
            name="position"
            id="select-position"
            defaultValue={0}
            onChange={this.updatePosition}
        >
          <option value="0" disabled hidden>Select your position</option>
          {positions}
        </select>
    );
  }
}

export default Position;


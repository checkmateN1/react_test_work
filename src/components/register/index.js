// Core
import React, { Component } from 'react';

// Instruments
import './style.scss'

// Components
import Phone from '../phone';
import FileUpload from '../fileUpload';

class Register extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { picture: null };
  //   //this.onDrop = this.onDrop.bind(this);
  // }

  state = {
    name: '',
    email: '',
  };

  render() {
    const positions = this.props.positions.map(position => (
        <option>{position.name}</option>
    ));

    return (
        <form className="register-form">
          <div>
            <fieldset>
              <legend>Name</legend>
              <input type="text" placeholder='Your name'/>
            </fieldset>
            <fieldset>
              <legend>Email</legend>
              <input type="text" placeholder='Your email'/>
            </fieldset>
            <Phone/>
          </div>

          <div>
            <select name="position" id="select-position" defaultValue={0}>
              <option value="0" disabled hidden>Select your position</option>
              {positions}
            </select>
            <FileUpload/>
          </div>
        </form>
    );
  }
}

export default Register;

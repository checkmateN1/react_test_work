// Core
import React, { Component } from 'react';

// Instruments
import './style.scss'

// Components
import Phone from '../phone';
import FileUpload from '../fileUpload';
import Name from '../name';
import Email from '../email';
import Position from '../position';


class Register extends Component {

  state = {
    name: '',
    email: '',
    phone: '+38(___) ___ __ __',
    position_id: '',
    photo: '',
    isReady: false,
  };

  setName = (name) => {this.setState({name})};
  setEmail = (email) => {this.setState({email})};
  setPhone = (phone) => {this.setState({phone})};
  setPosition = (position_id) => {this.setState({position_id})};
  setPhoto = (photo) => {this.setState({photo})};

  render() {
    return (
      <form className="register-form">
        <div>
          <Name setName={this.setName} name={this.state.name}/>
          <Email setEmail={this.setEmail} email={this.state.email}/>
          <Phone setPhone={this.setPhone} phone={this.state.phone}/>
        </div>
        <div>
          <Position setPosition={this.setPosition} positions={this.props.positions}/>
          <FileUpload setPhoto={this.setPhoto} photo={this.state.photo}/>
        </div>
        <div className='register-sign-up'>
          <button>Sign Up</button>
        </div>
      </form>
    )
  }
}

export default Register;

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
import {url} from "../../config/api";


class Register extends Component {

  constructor () {
    super();

    this.postUser = this.postUser.bind(this);
  }

  state = {
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: '',
  };

  setName = (name) => {this.setState({name})};
  setEmail = (email) => {this.setState({email})};
  setPhone = (phone) => {this.setState({phone})};
  setPosition = (position_id) => {this.setState({position_id})};
  setPhoto = (photo) => {this.setState({photo})};

  formClick = (e) => {
    e.preventDefault();
  };

  async postUser(e) {
    e.preventDefault();

    const { name, email, phone, position_id, photo } = this.state;
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone',  phone);
    formData.append('position_id', position_id);
    formData.append('photo', photo);

    let request = new XMLHttpRequest();
    request.open("POST", url + 'users');
    request.setRequestHeader('Token', this.props.token);
    await request.send(formData);

    request.onreadystatechange = function() {
      if (request.readyState == XMLHttpRequest.DONE) {
        //alert(request.responseText);
        // request.responseText {"success":true,"user_id":603,"message":"New user successfully registered"}  // response from server
      }
    }
  };

  render() {
      const { name, email, phone, position_id, photo } = this.state;
      const isReady = name && email && phone && position_id && photo;

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
          <button
            id='submit-form'
            className={isReady ? 'ready-sign-up' : ''}
            disabled={!isReady}
            onClick={this.postUser}
          >Sign Up</button>
        </div>
      </form>
    )
  }
}

export default Register;

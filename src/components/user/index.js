// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';
//import Man from '../../img/users/man-1.jpg'

class User extends Component {

  render() {
    const { name, specialization, email, phone, img } = this.props;

    return (
      <div className={'user'}>
        <img src={ img } alt={ name }/>
        <h5>{ name }</h5>
        <p>{ specialization }</p>
        <p>{ email }</p>
        <p>{ phone }</p>
      </div>
    );
  }
}

export default User;

User.defaultProps = {
  name: 'James',
  specialization: 'JavaScript developer',
  email: 'jamesmask@gmail.com',
  phone: '+380937777777',
  img: '#',
};
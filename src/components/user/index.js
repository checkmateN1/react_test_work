// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';


class User extends Component {

  render() {
    const { name, specialization, email, phone, photo } = this.props;

    return (
      <div className='user'>
        <div className='avatar'>
          <img src={ photo } alt={ name } width={70} height={70}/>
        </div>
        <div className='data'>
          <h5>{ name }</h5>
          <p>{ specialization }</p>
          <p>{ email }</p>
          <p>{ phone }</p>
        </div>
      </div>
    );
  }
}

export default User;

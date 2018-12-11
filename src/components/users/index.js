// Core
import React, { Component } from 'react';
import FlipMove from "react-flip-move";

// Components
import User from "../user";

// Instruments
import './style.scss';


class Users extends Component {

  state = {
    usersCount: 6,
  };

  showMoreUsers = () => {

  };

  render() {
    const { users } = this.props;

    const usersList = users.map( user => (
        <User
            name={ user.name }
            specialization={ user.position }
            key={user.id}
            email={user.email}
            phone={user.phone}
            //photo={user.photo}
        />
    )).slice(0, this.state.usersCount);

    return (
        <section className="users">
          <h3>cheerful users</h3>
          <div className={'users-wrapper'}>
            <FlipMove>
              {usersList}
            </FlipMove>
          </div>
          <button className='show-more-btn' onClick={this.showMoreUsers}>Show more</button>
        </section>
    );
  }
}

export default Users;

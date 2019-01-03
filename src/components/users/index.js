// Core
import React, { Component } from 'react';
import FlipMove from "react-flip-move";

// Components
import User from "../user";

// Instruments
import './style.scss';


class Users extends Component {

  render() {
    const { users, shownUsers, getUsers } = this.props;

    const usersList = users.map( user => (
        <User
            name={ user.name }
            specialization={ user.position }
            key={user.id}
            email={user.email}
            phone={user.phone}
            //photo={user.photo}
        />
    )).slice(0, shownUsers);

    return (
        <section className="users">
          <h3>cheerful users</h3>
          <div className={'users-wrapper'}>
            <FlipMove>
              {usersList}
            </FlipMove>
          </div>
          <button
              className={users.length <= shownUsers ? 'hidden' : ''}
              onClick={() => getUsers(true)}
          >
            Show more
          </button>
        </section>
    );
  }
}

export default Users;

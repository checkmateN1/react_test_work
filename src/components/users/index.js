// Core
import React, { Component } from 'react';
import FlipMove from "react-flip-move";

// Components
import { url } from '../../config/api';

// Instruments
import './style.scss';
import User from "../user";

class Users extends Component {

  state = {
    users: [],
  };

  // async componentDidMount() {
  //   try {
  //     const response = await fetch(url + 'token');
  //     if (!response.ok) {
  //       throw Error(response.statusText);
  //     }
  //     const { token } = await response.json();
  //     this.setState({ token });
  //
  //     this.getUsers(6);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  

  async getUsers(count) {
    try {
      const response = await fetch(url + `users?page=1&count=${count}`);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const { users } = await response.json();
    //console.log(data);
    this.setState({ users });

    } catch (error) {
      console.log(error);
    }
  };

  async getPositions() {
    try {
      const response = await fetch(url + ``);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const { users } = await response.json();
      //console.log(data);
      this.setState({ users });

    } catch (error) {
      console.log(error);
    }
  };



  render() {
    return (
        <section className="users">
          <h3>cheerful users</h3>
          <FlipMove>
            {/*{arrUsers}*/}
            <User />
          </FlipMove>

        </section>
    );
  }
}

export default Users;

// Core
import React, { Component } from 'react';

// Components
import Users from './components/users'
import Register from './components/register'
import Spinner from "./components/spinner";

// Config
import { url } from './config/api';


class App extends Component {
  state = {
    token: '',
    users: [],
    positions: [],
    isSpinning: true,
  };

  async componentDidMount() {
    this.getUsers(6);
    this.getPositions();
    this.getToken();
  }

  async getToken() {
    try {
      const response = await fetch(url + 'token');

      if (!response.ok) {
        throw Error(response.statusText);
      }
      const { token } = await response.json();

      this.setState({ token });
    } catch (error) {
      console.log(error);
    }
  };

  async getUsers(count) {
    try {
      const response = await fetch(url + `users?page=1&count=${count}`);

      if (!response.ok) {
        throw Error(response.statusText);
      }
      const { users } = await response.json();
      this.setState({ users });

    } catch (error) {
      console.log(error);
    }
  };

  async getPositions() {
    try {
      const response = await fetch(url + 'positions');

      if (!response.ok) {
        throw Error(response.statusText);
      }
      const { positions } = await response.json();
      this.setState({ positions });

    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { users, positions, isSpinning } = this.state;

    return (
      <>
        <Users
            users={users}
            getUsers={this.getUsers}
            positions={positions}
        />
        <Register positions={positions}/>
        <Spinner spin={isSpinning}/>
      </>
    );
  }
}

export default App;

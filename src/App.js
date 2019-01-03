// Core
import React, { Component } from 'react';

// Components
import Users from './components/users'
import Register from './components/register'
import Spinner from "./components/spinner";

// Config
import { url } from './config/api';

class App extends Component {
  constructor () {
    super();

    this.getUsers = this.getUsers.bind(this);
  }

  state = {
    token: '',
    users: [],
    user: {},
    shownUsers: 0,
    positions: [],
    isSpinning: true,
    mobWidth: 480,
  };

  componentDidMount() {
    this.getUsers(true);
    this.getUserById(1, true);
    this.getPositions();
    this.getToken();

    window.addEventListener("resize", this.updateShownUsers);
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

  async getUserById(id, setUser) {
    try {
      const response = await fetch(url + 'users/' + id);

      if (!response.ok) {
        throw Error(response.statusText);
      }
      const { user } = await response.json();

      this.setState({ user });
      if (setUser) {
        document.getElementById('user-name-header').innerText = user.name;
        document.getElementById('user-email-header').innerText = user.email;
        document.getElementById('user-avatar').setAttribute('src', user.photo);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async getUsers(isGetNew) {
    const { shownUsers, mobWidth } = this.state;
    let count = !isGetNew ? 0 : (shownUsers === 0 && window.innerWidth <= mobWidth) || (shownUsers === 3 && window.innerWidth > mobWidth) ? 3 : 6;

    try {
      const response = await fetch(url + `users?page=1&count=${shownUsers + count + 1}`);

      if (!response.ok) {
        throw Error(response.statusText);
      }
      const { users } = await response.json();
      this.setState({ users, shownUsers: shownUsers + count });

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

  updateShownUsers = () => {
    const { shownUsers, mobWidth } = this.state;
    if (window.innerWidth <= mobWidth && shownUsers === 6) {
      this.setState({shownUsers: 3});
      return false;
    }
    if (window.innerWidth > mobWidth && shownUsers === 3) {this.getUsers(true)}
  };

  render() {
    const { users, shownUsers, positions, token, isSpinning } = this.state;

    return (
      <>
        <Users
          users={users}
          shownUsers={shownUsers}
          positions={positions}
          getUsers={this.getUsers}
        />
        <Register
          token={token}
          positions={positions}
        />
        <Spinner spin={isSpinning}/>
      </>
    );
  }
}

export default App;

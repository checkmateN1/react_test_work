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
    isSpining: true,
  };

  async componentDidMount() {
    //get token
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
  }

  render() {
    return (
      <>
        <Users token={this.state.token}/>
        <Register token={this.state.token}/>
        <Spinner spin={this.state.isSpining}/>
      </>
    );
  }
}

export default App;

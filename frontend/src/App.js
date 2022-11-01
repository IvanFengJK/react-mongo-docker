import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import axios from 'axios';
const backendUrl = `http://localhost:8080`;

class App extends Component {
  state = {
    users: []
  };

  async createUser() {
    await axios.get(backendUrl + '/user-create');
    this.loadUsers();
  }

  async loadUsers() {
    console.log("Preparing to update")
    const res = await axios.get(backendUrl + '/users');
    this.setState({
      users: res.data
    });
    console.log("Done display")
  }

  async clearUsers(){
    await axios.get(backendUrl + '/clear_all');
    this.loadUsers()
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => this.createUser()}>Create User</button>
          <button onClick={() => this.clearUsers()}>Clear all Users</button>
          <p>Users list:</p>
          <ul>
            {this.state.users.map(user => (
              <li key={user._id}>id: {user._id}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;

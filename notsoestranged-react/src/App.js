import React, { Component } from 'react';
import './App.css';
import LoginRegister from './LoginRegister'

export default class App extends Component {

  constructor() {
    super() 

    this.state = {
      loggedIn: false,
      loggedInUserEmail: '',
      admin: true
    }

  }

  register = async (registerInfo) => {
    let userType = this.state.admin ? "admins" : "users"
    const url = process.env.REACT_APP_API_URL + `/api/${userType}/register`

    try {
      const registerResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("Here is registerResponse:", registerResponse)
      const registerJson = await registerResponse.json()
      console.log("Here is registerJson:", registerJson)

      if(registerResponse.status === 201) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: registerJson.data.email
        })
      }

    } catch(error) {
      console.error("There was a problem trying to register with API.")
      console.error(error)
    }
  }



  login = async (loginInfo) => {
    console.log("login() in App.js called with loginInfo:", loginInfo) 
    let userType = this.state.admin ? "admins" : "users"
    const url = process.env.REACT_APP_API_URL + `/api/${userType}/login`

    try {
      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("loginResponse:", loginResponse)
      const loginJson = await loginResponse.json()
      console.log("loginJson", loginJson)

      if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: loginJson.data.email
        })
      }

    } catch(error) {
      console.error("There was a problem logging in.")
      console.error(error)
    }
  }

  logout = async () => {
    try {
      let userType = this.state.admin ? "admins" : "users"
      const url = process.env.REACT_APP_API_URL + `/api/${userType}/logout`
      const logoutResponse = await fetch(url, { credentials: 'include' })
      console.log("logoutResponse", logoutResponse)
      const logoutJson = await logoutResponse.json()
      console.log("logoutJson", logoutJson)

      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: false,
          loggedInUserEmail: ''
         })
      }

    } catch(error) {
      console.error("There was a problem logging out.")
      console.error(error)
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.loggedIn
          ?
          <React.Fragment>
            <p>Header and Container go here!</p>
          </React.Fragment>
          :
          <LoginRegister login={this.login} register={this.register} />
        }
      </div>
    );
  }
}





import React, { Component } from 'react';
import './App.css';
import LoginRegister from './LoginRegister'
import HeaderNav from './HeaderNav'
import EventDropdown from './EventDropdown'
import MainContainer from './MainContainer'

export default class App extends Component {

  constructor() {
    super() 

    this.state = {
      loggedIn: false,
      loggedInUserEmail: '',
      loggedInUserIsAdmin: false 
    }

  }

  register = async (registerInfo) => {
    const url = process.env.REACT_APP_API_URL + `/api/users/register`
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

      if(registerJson.data.is_admin === true) {
        this.setState({
          loggedInUserIsAdmin: true
        })
      }

      console.log("Here is this.state. in App.js. I'm looking to see that loggedInUserIsAdmin is true")
      console.log(this.state)

    } catch(error) {
      console.error("There was a problem trying to register with API.")
      console.error(error)
    }
  }



  login = async (loginInfo) => {
    console.log("login() in App.js called with loginInfo:", loginInfo) 
    const url = process.env.REACT_APP_API_URL + `/api/users/login`

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

      if(loginJson.data.is_admin === true) {
        this.setState({
          loggedInUserIsAdmin: true
        })
      } else {
        this.setState({
          loggedInUserIsAdmin: false
        })
      }

    } catch(error) {
      console.error("There was a problem logging in.")
      console.error(error)
    }
  }

  logout = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + `/api/users/logout`
      const logoutResponse = await fetch(url, { credentials: 'include' })
      console.log("logoutResponse", logoutResponse)
      const logoutJson = await logoutResponse.json()
      console.log("logoutJson", logoutJson)

      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: false,
          loggedInUserEmail: '',
          loggedInUserIsAdmin: false
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
            <HeaderNav email={this.state.loggedInUserEmail} logout={this.logout} />
            {  this.state.loggedInUserIsAdmin === true
               ?
               <EventDropdown  /> 
               :
               <MainContainer loggedInUserEmail={this.state.loggedInUserEmail} />
            }
          </React.Fragment>
          :
          <LoginRegister login={this.login} register={this.register} />
        }
      </div>
    );
  }
}





import React, { Component } from 'react'
import { Form, Button, Label, Grid, Message, Header, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class LoginRegister extends Component {

	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			username: '',
			action: 'Login'
		}
	}

	

}
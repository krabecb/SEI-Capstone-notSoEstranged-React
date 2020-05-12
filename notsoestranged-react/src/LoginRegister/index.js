import React, { Component } from 'react'
import { Form, Button, Label, Grid, Message, Header, Icon, Checkbox } from 'semantic-ui-react'
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

	switch = () => {
		if(this.state.action === "Login") {
			this.setState({ action: "Register" })
		} else {
			this.setState({ action: "Login" })
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log(`You are trying to ${this.state.action.toLowerCase()} with the following credentials:`)
		console.log(this.state)

		if(this.state.action === "Register") {
			this.props.register(this.state)
		} else {
			this.props.login(this.state)
		}
	}

	render() {
		return(
			<Grid textAlign='center' style={{ height: '105vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 476 }}>
					<React.Fragment>
						<Header as='h2' color='olive' textAlign='center'>
							<Icon name='add user' /> notSoEstranged
						</Header>
						<h2>{this.state.action} here</h2>
						<Form onSubmit={this.handleSubmit}>
							{
								this.state.action === "Register"
								&&
								<React.Fragment>
									<div>
										<p id="checkbox-p">Are you hosting an event?</p>
										<Checkbox />
									</div>
									<Label id="username-label">Username:</Label>
									<Form.Input
										icon='user'
										iconPosition='left'
										type="text"
										name="username"
										placeholder="Enter username"
										value={this.state.username}
										onChange={this.handleChange}
									/>
								</React.Fragment>
							}
							<Label id="email-label">Email:</Label>
							<Form.Input
								icon='mail'
								iconPosition='left'
								type="email"
								name="email"
								placeholder="Enter email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<Label id="password-label">Password:</Label>
							<Form.Input
								icon='lock'
								iconPosition='left'
								type="password"
								name="password"
								placeholder="Enter password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<Button id="login-signup-button" type="Submit" fluid size='large'>
								{this.state.action === "Login" ? "Log in" : "Sign up"}
							</Button>
						</Form>
						{
							this.state.action === "Login"
							?
							<Message>
								Need an account? Register <span className="here-link" onClick={this.switch}>here</span>
							</Message>
							:
							<Message>
								Already have an account? Log in <span className="here-link" onClick={this.switch}>here</span>
							</Message>
						}
					</React.Fragment>
				</Grid.Column>
			</Grid>
		)
	}

}
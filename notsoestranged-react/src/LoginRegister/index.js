import React, { Component } from 'react'
import { Form, Button, Label, Grid, Message, Header, Icon, Checkbox } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import RubberBand from 'react-reveal/RubberBand'
import './index.css'

export default class LoginRegister extends Component {

	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			username: '',
			date_of_birth: '',
			address: '',
			phone_number: '',
			emergency_contact: '',
			about_me: '',
			action: 'Login',
			is_admin: false
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

	handleCheckboxChange = (event, { checked }) => {
		console.log('Change:', checked)
		this.setState({
			is_admin: !this.state.is_admin
		})
		console.log("is_admin", this.state.is_admin)
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
			<Grid textAlign='center' style={{ height: '150vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 476 }}>
					<React.Fragment>
						<RubberBand>
							<Header as='h2' color='olive' textAlign='center'>
								<Icon name='add user' /> notSoEstranged
							</Header>
						</RubberBand>
						<h2>{this.state.action} here</h2>
						<Form onSubmit={this.handleSubmit}>
							{
								this.state.action === "Register"
								&&
								<React.Fragment>
									<div>
										<p id="checkbox-p">Are you hosting an event?</p>
										<Checkbox
											checked={this.state.is_admin}
											onChange={this.handleCheckboxChange}
											name="is_admin"
										/> 
									</div>
									<Label id="username-label">Email:</Label>
									<Form.Input
										icon='mail'
										iconPosition='left'
										type="text"
										name="email"
										placeholder="Enter email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
									<Label id="dob-label">Date of Birth:</Label>
									<Form.Input
										icon='birthday cake'
										iconPosition='left'
										type="date"
										name="date_of_birth"
										placeholder="Enter date of birth"
										value={this.state.date_of_birth}
										onChange={this.handleChange}
									/>
									{
										this.state.is_admin === true
										&&
										<React.Fragment>
											<Label id="address-label">Address:</Label>
											<Form.Input
												icon='map pin'
												iconPosition='left'
												type="text"
												name="address"
												placeholder="Enter address"
												value={this.state.address}
												onChange={this.handleChange}
											/>
											<Label id="phone-number-label">Phone Number:</Label>
											<Form.Input
												icon='mobile'
												iconPosition='left'
												type="text"
												name="phone_number"
												placeholder="Enter phone number"
												value={this.state.phone_number}
												onChange={this.handleChange}
											/>
										</React.Fragment>
									}
									<Label id="emergency-label">Emergency Contact:</Label>
									<Form.Input
										icon='emergency'
										iconPosition='left'
										type="text"
										name="emergency_contact"
										placeholder="Enter emergency contact"
										value={this.state.emergency_contact}
										onChange={this.handleChange}
									/>
									<Label id="about-label">About Me:</Label>
									<Form.Input
										icon='pencil'
										iconPosition='left'
										type="text"
										name="about_me"
										placeholder="Tell us something about yourself!"
										value={this.state.about_me}
										onChange={this.handleChange}
									/>
								</React.Fragment>
							}
							<Label id="email-label">Username:</Label>
							<Form.Input
								icon='user'
								iconPosition='left'
								type="text"
								name="username"
								placeholder="Enter username"
								value={this.state.username}
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
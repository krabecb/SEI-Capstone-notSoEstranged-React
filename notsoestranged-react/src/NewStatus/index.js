import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

export default class NewStatus extends Component {
	constructor(props) {
		super(props)

		this.state = {
			status: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.createStatus(this.state)
		//clear form
		this.setState({
			status: ''
		})
	}
	
	render() {
		return(
			<Segment id='new-status'>
				<h4 id="new-status-header">What's on your mind?</h4>
				<Form id="new-status-form" onSubmit={this.handleSubmit}>
					<Label id="status">Status</Label>
					<Form.Input
						type="text"
						name="status"
						value={this.state.status}
						placeholder="Share something!"
						onChange={this.handleChange}
					/>
					<Button id="post-status" type="Submit">Share</Button>
				</Form>
			</Segment>
		)
	}
}
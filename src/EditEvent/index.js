import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

export default class EditEvent extends Component {
	constructor(props) {
		super(props)

		console.log("Here is props in the editEvent constructor:")
		console.log(props)

		this.state = {
			event_name: props.eventToEdit.event_name,
			event_organizer: props.eventToEdit.event_organizer,
			event_location: props.eventToEdit.event_location,
			date_of_event: props.eventToEdit.date_of_event
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		console.log(this.state)
		event.preventDefault()
		this.props.updateEvent(this.state)
	}

	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
				<Header id="edit-event-header">
					<h3>Edit Event</h3>
				</Header>
				<Modal.Content id="modal-content-edit">
					<Form onSubmit={this.handleSubmit}>
						<Label id="edit-event-name">Name of Event:</Label>
						<Form.Input
							type="text"
							name="event_name"
							value={this.state.event_name}
							placeholder="Enter event name"
							onChange={this.handleChange}
						/>
						<Label id="edit-event-organizer">Event Organizer:</Label>
						<Form.Input
							type="text"
							name="event_organizer"
							value={this.state.event_organizer}
							placeholder="Enter event organizer"
							onChange={this.handleChange}
						/>
						<Label id="edit-event-location">Location of Event:</Label>
						<Form.Input
							type="text"
							name="event_location"
							value={this.state.event_location}
							onChange={this.handleChange}
						/>
						<Label id="edit-date-of-event">Date(s) For Event:</Label>
						<Form.Input
							type="text"
							name="date_of_event"
							value={this.state.date_of_event}
							placeholder="Enter date(s)"
							onChange={this.handleChange}
						/>
						<Modal.Actions>
							<Button id="update-event" type="Submit">Update Event</Button>
						</Modal.Actions>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}
import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

export default class NewEvent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			event_name: '',
			event_organizer: '',
			event_location: '',
			date_of_event: '',
			event_description: '',
			longitude: '',
			latitude: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.createEvent(this.state)
		//clear form
		this.setState({
			event_name: '',
			event_organizer: '',
			event_location: '',
			date_of_event: '',
			event_description: '',
			longitude: '',
			latitude: ''
		})
	}
	

	render() {
		return(
			<Segment id='new-event'>
				<h4 id="new-event-header">Create an Event:</h4>
				<Form id="new-event-form" onSubmit={this.handleSubmit}>
					<Label id="event-name">Name of Event:</Label>
					<Form.Input
						type="text"
						name="event_name"
						value={this.state.event_name}
						placeholder="Enter event name"
						onChange={this.handleChange}
					/>
					<Label id="event-organizer">Event Organizer:</Label>
					<Form.Input
						type="text"
						name="event_organizer"
						value={this.state.event_organizer}
						placeholder="Enter event organizer"
						onChange={this.handleChange}
					/>
					<Label id="event-location">Location of Event:</Label>
					<Form.Input
						type="text"
						name="event_location"
						value={this.state.event_location}
						onChange={this.handleChange}
					/>
					<Label id="date-of-event">Date(s) For Event:</Label>
					<Form.Input
						type="text"
						name="date_of_event"
						value={this.state.date_of_event}
						placeholder="Enter date(s)"
						onChange={this.handleChange}
					/>
					<Label id="event-description">Description of Event:</Label>
					<Form.Input
						type="text"
						name="event_description"
						value={this.state.event_description}
						placeholder="What's your event about?"
						onChange={this.handleChange}
					/>
					<Label id="event-longitude">Longitude:</Label>
					<Form.Input
						type="text"
						name="longitude"
						value={this.state.longitude}
						placeholder="Enter longitude of event location"
						onChange={this.handleChange}
					/>
					<Label id="event-latitude">Latitude:</Label>
					<Form.Input
						type="text"
						name="latitude"
						value={this.state.latitude}
						placeholder="Enter latitude of event location"
						onChange={this.handleChange}
					/>
					<Button id="add-event" type="Submit">Add Event</Button>
				</Form>
			</Segment>
		)
	}
}
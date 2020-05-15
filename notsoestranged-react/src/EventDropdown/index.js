import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import NewEvent from '../NewEvent'
import EventList from '../EventList'
import EditEvent from '../EditEvent'

export default class EventDropdown extends Component {

	constructor(props) {
		super(props)

		this.state = {
			events: [],
			idOfEventToEdit: -1
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount()")
		this.getEvents()
		console.log(this.state)
	}

	getEvents = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/events/"
			const eventsResponse = await fetch(url, { credentials: 'include' })
			const eventsJson = await eventsResponse.json()

			this.setState({
				events: eventsJson.data
			})

		} catch(error) {
			console.error("There was a problem getting event data:", error)
		}
	}

	deleteEvent = async (idOfEventToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/events/" + idOfEventToDelete

		try {
			const deleteEventResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})
			console.log("deleteEventResponse", deleteEventResponse)
			const deleteEventJson = await deleteEventResponse.json()
			console.log("deleteEventJson", deleteEventJson)

			if(deleteEventResponse.status === 200) {
				this.setState({
					events: this.state.events.filter(event => event.id !== idOfEventToDelete)
				})
			}
		} catch(error) {
			console.error("There was a problem deleting the event:")
			console.error(error)
		}
	}

	createEvent = async (eventToAdd) => {
		console.log("Here is the event you're trying to add:")
		console.log(eventToAdd)

		try {
			const url = process.env.REACT_APP_API_URL + "/api/events/"
			const createEventResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(eventToAdd),
				headers: { 'Content-Type': 'application/json' }
			})
			console.log("createEventReponse", createEventResponse)
			const createEventJson = await createEventResponse.json()
			console.log("Here's what happened after trying to add an event:")
			console.log(createEventJson)

			if(createEventResponse.status === 201) {
				this.setState({
					events: [...this.state.events, createEventJson.data]
				})
			}
		} catch(error) {
			console.error("There was a problem adding an event")
			console.error(error)
		}
	}

	editEvent = (idOfEventToEdit) => {
		console.log("You are trying to edit an event with id:", idOfEventToEdit)

		this.setState({
			idOfEventToEdit: idOfEventToEdit
		})
	}

	updateEvent = async (updatedEventInfo) => {
		const url = process.env.REACT_APP_API_URL + "/api/events/" + this.state.idOfEventToEdit

		try {
			const updateEventResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(updatedEventInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("updateEventResponse", updateEventResponse)
			const updateEventJson = await updateEventResponse.json()
			console.log("updateEventJson", updateEventJson)

			console.log(updateEventResponse.status)
			console.log(updateEventResponse.headers)

			if(updateEventResponse.status === 200) {
				const events = this.state.events
				const indexOfEventBeingUpdated = events.findIndex(event => event.id === this.state.idOfEventToEdit)
				events[indexOfEventBeingUpdated] = updateEventJson.data
				this.setState({
					events: events,
					idOfEventToEdit: -1 //close the modal
				})
			}
		} catch(error) {
			console.error("There was a problem updating event info")
			console.error(error)
		}
	}

	closeModal = () => {
		console.log("Here is closeModal in MainContainer")
		this.setState({
			idOfEventToEdit: -1
		})
	}

	render() { 
		return(
			<div id="event-dropdown-div">
				{
					<React.Fragment>
						<Header as='h2' color='olive' textAlign='center'>
							Where you headed off to this time? 
						</Header>
						<NewEvent createEvent={this.createEvent} />
						<EventList events={this.state.events} deleteEvent={this.deleteEvent} editEvent={this.editEvent}/>
					</React.Fragment>
				}
				{
					this.state.idOfEventToEdit !== -1
					&&
					<EditEvent
						key={this.state.idOfEventToEdit}
						eventToEdit={this.state.events.find((event) => event.id === this.state.idOfEventToEdit)}
						updateEvent={this.updateEvent}
						closeModal={this.closeModal}
					/>
				}
			</div>
		)
	}
}
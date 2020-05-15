import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import NewEvent from '../NewEvent'
import EventList from '../EventList'
import EditEvent from '../EditEvent'
import ConfirmAdminEvent from '../ConfirmAdminEvent'
import Home from '../Home'

export default class EventDropdown extends Component {

	constructor(props) {
		super(props)

		this.state = {
			events: [],
			eventsUserIsAttending: [],
			idOfEventToEdit: -1,
			idOfEventToAttendAdmin: -1
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount()")
		this.getEvents()
		this.getAttendances()
		console.log(this.state)
	}

	getAttendances = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/attendances/"
			const attendancesResponse = await fetch(url, { credentials: 'include' })
			const attendancesJson = await attendancesResponse.json()

			this.setState({
				eventsUserIsAttending: attendancesJson.data
			})
			console.log("Here is attendancesJson.data from getAttendances():")
			console.log(attendancesJson.data)

		} catch(error) {
			console.error("There was a problem getting event data:", error)
		}
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

	attendEvent = (idOfEventToAttendAdmin) => {
		console.log("You are trying to attend an event with id:", idOfEventToAttendAdmin)

		this.setState({
			idOfEventToAttendAdmin: idOfEventToAttendAdmin
		})
	}

	userAttendEvent = async (attendEventInfo) =>{
		const url = process.env.REACT_APP_API_URL + "/api/users/" + this.state.idOfEventToAttendAdmin

		try {
			const attendEventResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(attendEventInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("attendEventResponse", attendEventResponse)
			const attendEventJson = await attendEventResponse.json()
			console.log("attendEventJson", attendEventJson)

			console.log(attendEventResponse.status)
			console.log(attendEventResponse.headers)

			if(attendEventResponse.status === 200) {
				const events = this.state.events
				const indexOfEventBeingAttended = events.findIndex(event => event.id === this.state.idOfEventToAttendAdmin)
				events[indexOfEventBeingAttended] = attendEventJson.data
				this.setState({
					events: events,
					idOfEventToAttendAdmin: -1, //close the modal
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

	closeAttendModal = () => {
		console.log("Here is closeAttendModal in MainContainer")
		this.setState({
			idOfEventToAttendAdmin: -1
		})
	}

	render() { 
		return(
			<div id="event-dropdown-div">
				{
					this.state.eventsUserIsAttending.length > 0
					?
					<Home />
					:
					<React.Fragment>
						<Header as='h2' color='olive' textAlign='center'>
							Where you headed off to this time? 
						</Header>
						<NewEvent createEvent={this.createEvent} />
						<EventList events={this.state.events} deleteEvent={this.deleteEvent} editEvent={this.editEvent} attendEvent={this.attendEvent} />
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
				{
					this.state.idOfEventToAttendAdmin !== -1
					&&
					<ConfirmAdminEvent events={this.state.events} userAttendEvent={this.userAttendEvent} closeAttendModal={this.closeAttendModal} />
				}
			</div>
		)
	}
}
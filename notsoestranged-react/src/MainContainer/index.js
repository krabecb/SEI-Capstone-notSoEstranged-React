import React, { Component } from 'react'
import UserEventList from '../UserEventList'
import ConfirmEvent from '../ConfirmEvent'

export default class MainContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			events: [],
			idOfEventToAttend: -1,
			userAttendingEvent: false
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount() in MainContainer:")
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
			console.log("Here is eventsJson.data from getEvents():")
			console.log(eventsJson.data)

		} catch(error) {
			console.error("There was a problem getting event data:", error)
		}
	}

	attendEvent = (idOfEventToAttend) => {
		console.log("You are trying to attend an event with id:", idOfEventToAttend)

		this.setState({
			idOfEventToAttend: idOfEventToAttend
		})
	}

	userAttendEvent = async (attendEventInfo) =>{
		const url = process.env.REACT_APP_API_URL + "/api/users/" + this.state.idOfEventToAttend

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

			if(attendEventResponse.status === 201) {
				const events = this.state.events
				const indexOfEventBeingAttended = events.findIndex(event => event.id === this.state.idOfEventToAttend)
				events[indexOfEventBeingAttended] = attendEventJson.data
				this.setState({
					events: events,
					idOfEventToAttend: -1, //close the modal
					userAttendingEvent: true
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
			idOfEventToAttend: -1
		})
	}

	render() {
		console.log("This is this.state. in render() in MainContainer:")
		console.log(this.state)
		return(
			<div>
				{
					this.state.events.length === 0
					?
					<p>There are no events yet</p>
					:
					<UserEventList events={this.state.events} attendEvent={this.attendEvent}/>
				}
				{
					this.state.idOfEventToAttend !== -1
					&&
					<ConfirmEvent events={this.state.events} userAttendEvent={this.userAttendEvent} closeModal={this.closeModal} />
				}
				{
					this.state.userAttendingEvent === true
					&&
					<p>Non-admin user should see this right after they log in if they are attending an event! :)</p>
				}
			</div>
		)
	}

}




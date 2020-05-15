import React, { Component } from 'react'
import UserEventList from '../UserEventList'
import ConfirmEvent from '../ConfirmEvent'
import Home from '../Home'

export default class MainContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			events: [],
			eventsUserIsAttending: [],
			idOfEventToAttend: -1,
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount() in MainContainer:")
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

	userAttendEvent = async () =>{
		const url = process.env.REACT_APP_API_URL + "/api/users/" + this.state.idOfEventToAttend

		try {
			const attendEventResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
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
				this.setState({
					eventsUserIsAttending: [events[indexOfEventBeingAttended]],
					idOfEventToAttend: -1 //close the modal
				})
			}

			this.closeModal()
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
					<div>
						{
							this.state.eventsUserIsAttending.length > 0
							?
							<Home eventUserIsAttending={this.state.eventsUserIsAttending[0]}/>
							:
							<UserEventList events={this.state.events} attendEvent={this.attendEvent}/>
						}
					</div>
				}
				{
					this.state.idOfEventToAttend !== -1
					&&
					<ConfirmEvent events={this.state.events} userAttendEvent={this.userAttendEvent} />
				}
			</div>
		)
	}

}




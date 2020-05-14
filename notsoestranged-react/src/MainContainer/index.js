import React, { Component } from 'react'
import UserEventList from '../UserEventList'

export default class MainContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			events: []
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
					<UserEventList events={this.state.events} />
				}
			</div>
		)
	}

}




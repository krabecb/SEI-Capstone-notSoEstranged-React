import React, { Component } from 'react'
import NewStatus from '../NewStatus'
import StatusList from '../StatusList'
import GoogleMap from '../GoogleMap'
import EditStatus from '../EditStatus'

export default class Home extends Component {

	constructor(props) {
		super(props)

		this.state = {
			statuses: [],
			idOfStatusToEdit: -1
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount() in Home:")
		this.getStatuses()
		console.log("Here is this.state in componentDidMount():")
		console.log(this.state)
	}

	getStatuses = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/statuses/"
			const statusesResponse = await fetch(url, { credentials: 'include' })
			const statusesJson = await statusesResponse.json()

			this.setState({
				statuses: statusesJson.data
			})

		} catch(error) {
			console.error("There was a problem getting status data:", error)
		}
	}

	deleteStatus = async (idOfStatusToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/statuses/" + idOfStatusToDelete

		try {
			const deleteStatusResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})
			console.log("deleteStatusResponse", deleteStatusResponse)
			const deleteStatusJson = await deleteStatusResponse.json()
			console.log("deleteStatusJson", deleteStatusJson)

			if(deleteStatusResponse.status === 200) {
				this.setState({
					statuses: this.state.statuses.filter(status => status.id !== idOfStatusToDelete)
				})
			}
		} catch(error) {
			console.error("There was a problem deleting the status:")
			console.error(error)
		}
	}

	createStatus = async (statusToAdd) => {
		console.log("Here is the status you're trying to add:")
		console.log(statusToAdd)

		try {
			const url = process.env.REACT_APP_API_URL + "/api/statuses/" + this.props.eventUserIsAttending.id
			const createStatusResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(statusToAdd),
				headers: { 'Content-Type': 'application/json' }
			})
			console.log("createStatusReponse", createStatusResponse)
			const createStatusJson = await createStatusResponse.json()
			console.log("Here's what happened after trying to add a status:")
			console.log(createStatusJson)

			if(createStatusResponse.status === 201) {
				this.setState({
					statuses: [...this.state.statuses, createStatusJson.data]
				})
			}
		} catch(error) {
			console.error("There was a problem adding a status:")
			console.error(error)
		}
	}

	editStatus = (idOfStatusToEdit) => {
		console.log("You are trying to edit a status with id:", idOfStatusToEdit)

		this.setState({
			idOfStatusToEdit: idOfStatusToEdit
		})
	}

	updateStatus = async (updatedStatusInfo) => {
		const url = process.env.REACT_APP_API_URL + "/api/statuses/" + this.state.idOfStatusToEdit

		try {
			const updateStatusResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(updatedStatusInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("updateStatusResponse", updateStatusResponse)
			const updateStatusJson = await updateStatusResponse.json()
			console.log("updateStatusJson", updateStatusJson)

			console.log(updateStatusResponse.status)
			console.log(updateStatusResponse.headers)

			if(updateStatusResponse.status === 200) {
				const statuses = this.state.statuses
				const indexOfStatusBeingUpdated = statuses.findIndex(status => status.id === this.state.idOfStatusToEdit)
				statuses[indexOfStatusBeingUpdated] = updateStatusJson.data
				this.setState({
					statuses: statuses,
					idOfStatusToEdit: -1 //close the modal
				})
			}
		} catch(error) {
			console.error("There was a problem updating status info:")
			console.error(error)
		}
	}

	closeModal = () => {
		console.log("Here is closeModal in Home:")
		this.setState({
			idOfStatusToEdit: -1
		})
	}

	render() {

		return(
			<div>
				{
					<React.Fragment>
						<h1 id="home-event-name">{this.props.eventUserIsAttending.event_name}</h1>
						<h3 id="home-event-date">{this.props.eventUserIsAttending.date_of_event}</h3>
						<h4 id="home-event-location">{this.props.eventUserIsAttending.event_location}</h4>
						<h4 id="home-event-description">{this.props.eventUserIsAttending.event_description}</h4>
						<NewStatus createStatus={this.createStatus} />
						<h3 id="news-feed">News Feed</h3>
						<div style={{
							display: 'flex',
							justifyContent: 'center',
							paddingTop: '20px',
							paddingBottom: '20px'
						}}>
						<StatusList statuses={this.state.statuses} deleteStatus={this.deleteStatus} editStatus={this.editStatus} loggedInUserEmail={this.props.loggedInUserEmail} />
						</div>
						<h3 id="map-location">Event Location</h3>
						<GoogleMap longitude={this.props.eventUserIsAttending.longitude} latitude={this.props.eventUserIsAttending.latitude} />
					</React.Fragment>
				}
				{
					this.state.idOfStatusToEdit !== -1
					&&
					<EditStatus
						key={this.state.idOfStatusToEdit}
						statusToEdit={this.state.statuses.find((status) => status.id === this.state.idOfStatusToEdit)}
						updateStatus={this.updateStatus}
						closeModal={this.closeModal}
					/>
				}
			</div>
		)
	}
}
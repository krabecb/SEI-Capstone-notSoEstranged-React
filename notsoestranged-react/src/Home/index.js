import React, { Component } from 'react'
import NewStatus from '../NewStatus'
import StatusList from '../StatusList'

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
			const url = process.env.REACT_APP_API_URL + "/api/statuses/"
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
			<React.Fragment>
			<p>{this.props.eventUserIsAttending.event_name}</p>
			<NewStatus createStatus={this.createStatus} />
			<h3 id="your-thoughts">Your Thoughts</h3>
			<StatusList statuses={this.state.statuses} />
			</React.Fragment>
		)
	}
}
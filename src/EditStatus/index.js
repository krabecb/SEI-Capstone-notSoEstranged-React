import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

export default class EditStatus extends Component {
	constructor(props) {
		super(props)

		console.log("Here is props in the editEvent constructor:")
		console.log(props)

		this.state = {
			status: props.statusToEdit.status,
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
		this.props.updateStatus(this.state)
	}

	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
				<Header id="edit-status-header">
					<h3>Edit Status</h3>
				</Header>
				<Modal.Content id="modal-content-edit-status">
					<Form onSubmit={this.handleSubmit}>
						<Label id="edit-status-name">Status:</Label>
						<Form.Input
							type="text"
							name="status"
							value={this.state.status}
							placeholder="Edit status"
							onChange={this.handleChange}
						/>
						<Modal.Actions>
							<Button id="update-status" type="Submit">Update Status</Button>
						</Modal.Actions>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}
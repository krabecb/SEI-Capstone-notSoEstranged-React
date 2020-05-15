import React from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'

export default function ConfirmAdminEvent(props) {

		return(
			<Modal open={true} closeIcon={true} onClose={() => props.closeAttendModal}>
				<Header id="confirm-event-header">
					<h3>You are about to attend this event!</h3>
				</Header>
				<Modal.Actions>
					<Button id="confirm-event" onClick={ () => props.userAttendEvent() }>Attend Event</Button>
				</Modal.Actions>
			</Modal>
		)
}
import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function EventList(props) {
	console.log("Here is props in EventList:")
	console.log(props)
	const events = props.events.map(event => {
		return(
			<Card key={event.id} color={"olive"} id="event-card">
				<Card.Content textAlign={"center"}>
					<Card.Header>
						{event.event_name}
					</Card.Header>
					<Card.Meta>
						{event.event_organizer}
					</Card.Meta>
					<Card.Meta>
						{event.event_location}
					</Card.Meta>
					<Card.Meta>
						{event.date_of_event}
					</Card.Meta>
				</Card.Content>
				<Card.Content id="card-content-event-list" textAlign={"center"}>
					<Button
						basic
						color='red'
						onClick={ () => props.deleteEvent(event.id) }
					>
						Delete {event.event_name}
					</Button>
					<Button
						basic
						color='orange'
						onClick={ () => props.editEvent(event.id) }
					>
						Edit {event.event_name}
					</Button>
				</Card.Content> 
			</Card>
		)
	})

	return(
		<Card.Group centered={true}>
			{events}
		</Card.Group>
	)
}
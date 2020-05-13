import React from 'react'
import { Dropdown, Header, Button } from 'semantic-ui-react'

export default function EventDropdown(props) {

	const testEventArray = [
		{key: 'test1', text: 'C2E2'},
		{key: 'test2', text: 'Star Wars 2021'},
		{key: 'test3', text: 'ACEN'}
	]

	return(
		<div id="event-dropdown-div">
			<Header as='h2' color='olive' textAlign='center'>
				Where you headed off to this time? 
			</Header>
			<Dropdown
				placeholder="Select event to attend"
				fluid
				search
				selection
				options={testEventArray}
			/>
			<Button
				basic
				color='olive'
				//onClick createEvent
			>
				Create an Event
			</Button>
		</div>
	)
}
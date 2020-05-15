import React from 'react'
import { Comment, Button, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function StatusList(props) {
	console.log("Here is props in StatusList:")
	console.log(props)
	const statuses = props.statuses.map(status => {
		return(
			<React.Fragment>

				<Comment.Group>

					<Comment key={status.id} id="status-comment">
						<Comment.Content textalign={"center"}>
							<Comment.Author as='a'>
								{status.user.username}
							</Comment.Author>
							<Comment.Metadata>
								{status.date_posted}
							</Comment.Metadata>
							<Comment.Text>
								{status.status}
							</Comment.Text>
							
						</Comment.Content>
					</Comment>

				</Comment.Group>

			</React.Fragment>
		)
	})

	return(
		<Comment.Group>
			{statuses}
		</Comment.Group>
	)
}
import React from 'react'
import { Comment, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function StatusList(props) {
	console.log("Here is props in StatusList:")
	console.log(props)
	const statuses = props.statuses.map(status => {
		return(
			<React.Fragment key={status.id}>

				<Grid centered columns={2}>

				<Comment.Group>

					<Comment id="status-comment">
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
							<Comment.Actions>
								<Comment.Action onClick={ () => props.deleteStatus(status.id) }>Delete</Comment.Action>
							</Comment.Actions>
						</Comment.Content>
					</Comment>

				</Comment.Group>

				</Grid>

			</React.Fragment>
		)
	})

	return(
		<Comment.Group>
			{statuses}
		</Comment.Group>
	)
}
import React from 'react'


export default function HeaderNav(props) {
	return(
		<nav>
			<div>
				<p id="header-p">
					Logged in as {props.email}. <span className="logout-link" onClick={props.logout}>Logout</span>
				</p>
			</div>
		</nav>
	)
}
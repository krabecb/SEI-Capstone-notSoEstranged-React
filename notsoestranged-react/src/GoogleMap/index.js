import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Container } from 'semantic-ui-react'

class GoogleMap extends Component {

	render() {
		console.log("This is props:")
		console.log(this.props.longitude)
		console.log(this.props.latitude)

		return(

			<Container>

				<Map
					google={this.props.google}
					zoom={14}
					initialCenter={{lat: 41.852140, lng: -87.618258}}
					style={{width: '75%', height: '75%', position: 'relative'}}
				>

	 
	        		<Marker
	        			title={'C2E2'}
	                	name={'C2E2'}
	                	position={{lat: this.props.latitude, lng: this.props.longitude }}
	                />
	 
	       		

	      		</Map>

      		</Container>

		)

	}

}

export default GoogleApiWrapper(
	(props) => ({
  apiKey: "AIzaSyAws8B11fYYJ6jjzzyj_MJArnMrzB5S3-0",
}))(GoogleMap)	
import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Container } from 'semantic-ui-react'

class GoogleMap extends Component {

	render() {

		return(

			<Container>

				<Map
					google={this.props.google}
					zoom={14}
					initialCenter={{lat: 41.850539, lng: -87.615857}}
					style={{width: '75%', height: '75%', position: 'relative'}}
				>

	 
	        		<Marker
	        			title={'C2E2'}
	                	name={'C2E2'}
	                	position={{lat: 41.850539, lng: -87.615857}} />
	 
	       		

	      		</Map>

      		</Container>

		)

	}

}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAws8B11fYYJ6jjzzyj_MJArnMrzB5S3-0")
})(GoogleMap)	
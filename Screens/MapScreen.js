import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    
    View,
    Dimensions
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');

export default class MapScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			region:{
				latitude: 17.456593,
				longitude: 78.375873,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			markers: [
				{latlng:{latitude: 17.452805, longitude: 78.379185}, title: "My Place 1", description: "this is my place 1", image: './img/one.png'},
				{latlng:{latitude: 17.457687, longitude: 78.372119}, title: "My Place 2", description: "this is my place 2", image: './img/two.png'},
				{latlng:{latitude: 17.462687, longitude: 78.374119}, title: "My Place 3", description: "this is my place 3", image: ''},
			],
			mapType: "standard"
		};
		this.regionChange = this.regionChange.bind(this);
		this.longPressHandler = this.longPressHandler.bind(this);
	}

	regionChange(region){
		this.setState({region});
	}
	longPressHandler(event){
		let data = event.nativeEvent;
		//ajax request for the reverse geocoding
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) {
				return;
			}

			if (request.status === 200) {
				console.log('success', request.responseText);
			} else {
				console.warn('error');
			}
		};

		request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/xml?latlng='+data.coordinate.latitude.toString() +','+data.coordinate.longitude.toString());
		request.send();
		//console.log(data);
		let marker = {
			latlng: {latitude: data.coordinate.latitude, longitude: data.coordinate.longitude},
			title: "My Place",
			description: "default description"
		};
		//console.log(marker);
		let myMarkers = this.state.markers;
		myMarkers.push(marker);
		this.setState({markers: myMarkers});
		
	}
	render() {
		return (
			<Container>
				<Header>
					<Left/>
					<Body>
						<Title>MapView</Title>
					</Body>
					<Right/>
				</Header>
				<Content>
					<MapView
						showsScale={true}
						zoomEnabled={true}
						scrollEnabled={true}
						loadingEnabled={true}
						showsUserLocation={true}
						showsCompass={true}
						style={{width: width, height: 8*height/10-20}}
						region={this.state.region}
						onRegionChange={this.regionChange}
						onLongPress={this.longPressHandler}
						mapType={this.state.mapType}
					>
						{this.state.markers.map((marker, key) => (
							<MapView.Marker
								key={key}
								coordinate={marker.latlng}
								title={marker.title}
								description={marker.description}
								image={require('./img/one.png')}
							/>
						))}
						<MapView.Polyline 
							coordinates={[{latitude: 17.452805, longitude: 78.379185},{latitude: 17.457687, longitude: 78.372119}]}
							strokeWidth={3}
							strokeColor="#000"
							lineCap="round"
						/>
					</MapView>
				</Content>
				<Footer>
					<FooterTab>
						<Button onPress={()=> {this.setState({mapType: "standard"})}}>
							<Text>Standard</Text>
						</Button>
						<Button onPress={()=> {this.setState({mapType: "satellite"})}}>
							<Text>Satellite</Text>
						</Button>
						<Button onPress={()=> {this.setState({mapType: "hybrid"})}}>
							<Text>Hybrid</Text>
						</Button>
						<Button onPress={()=> {this.setState({mapType: "terrain"})}}>
							<Text>Terrain</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
        );
    }
}
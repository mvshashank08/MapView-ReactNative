import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Linking,
    View,
    Dimensions
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');

export default class TestScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.regionChange = this.regionChange.bind(this);
		this.buttonHandler = this.buttonHandler.bind(this);
	}

	
	buttonHandler(event){
		let url = 'https://www.google.com/maps/dir/?api=1&origin=wavelabs&destination=Saroornagar';
		Linking.openURL(url).catch(err => console.error('An error occurred', err));
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
					<Button onPress={this.buttonHandler}>
						<Text>Terrain</Text>
					</Button>
				</Content>
				
			</Container>
        );
    }
}
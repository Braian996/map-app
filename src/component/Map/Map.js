import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView, Location, Permissions, Constants } from 'expo'

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000
}

class Map extends Component {
    state = {
        location: null,
        region: null,
        error: null
    }

    componentDidMount() {
        this._getLocationAsync()
        Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged)
    }

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== "granted") {
            this.setState({
                error: 'Permission to acess location was denied'
            });
        }

        // const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    }

    locationChanged = location => {
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0005
        }
        this.setState({ location, region })
    }

    render () {
        return (
            <MapView
                style={StyleSheet.absoluteFill}
                region={this.state.region}
                showsUserLocation={true}
                followsUserLocation={true}
            />
        )
    }

}

export default Map

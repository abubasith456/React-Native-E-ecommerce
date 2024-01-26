// LocationComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const LocationComponent = ({ onLocationChange }) => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                // getAddressFromLocation(latitude, longitude);
            },
            (error) => {
                console.log('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getAddressFromLocation = async (latitude, longitude) => {
        try {
            const response = await Geocoding.from({
                latitude,
                longitude,
            });

            const address = response.results[0].formatted_address;
            console.log("ADDRESS ==> " + address)
            // setAddress(address);
        } catch (error) {
            console.log('Error getting address:', error);
        }
    };


    useEffect(() => {
        // Optionally, you can watch for location changes
        getLocation()
        const watchId = Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                onLocationChange({ latitude, longitude });
            },
            (error) => {
                console.log('Error watching location:', error);
            },
            { enableHighAccuracy: true, distanceFilter: 10 }
        );

        return () => {
            // Clear the watch when the component is unmounted
            Geolocation.clearWatch(watchId);
        };
    }, [onLocationChange]);

    return (
        <View>
            <Text>Device Location:</Text>
            {location && (
                <Text>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </Text>
            )}
            {address && <Text>Address: {address}</Text>}
            {/* <Button title="Get Location" onPress={getLocation} /> */}
        </View>
    );
};

export default LocationComponent;

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, PermissionsAndroid, PermissionsIOS, NativeModules } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const REQUEST_LOCATION_PERMISSION = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

const PermissionScreen = ({ navigation }) => {
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocation();
        // const requestLocationPermission = async () => {
        //     const granted = await PermissionsAndroid.request(REQUEST_LOCATION_PERMISSION, {
        //         title: 'Hayat App Location Permission',
        //         message: 'Hayat needs access to your location to show nearby restaurants.',
        //         buttons: [PermissionsAndroid.BUTTONS.NEVER_ASK_AGAIN, PermissionsAndroid.BUTTONS.DENY, PermissionsAndroid.BUTTONS.ALLOW],
        //     });
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         setHasLocationPermission(true);
        //         console.log("PermissionsAndroid.RESULTS.GRANTED");
        //         // navigation.navigate('Home'); // Navigate to home screen on permission grant
        //     } else {
        //         console.log("PermissionsAndroid else called => " + granted);
        //     }
        // };

        // requestLocationPermission();
    }, []);

    const handleRequestPermission = async () => {
        if (Platform.OS === 'ios') {
            const granted = await PermissionsIOS.requestLocationWhenInUseAuthorization(); // Request 'when in use' access
            if (granted === 'authorizedWhenInUse') {
                console.log("Location permission granted (iOS)");
                getLocation(); // Call function to get location
            } else {
                console.log("Location permission denied (iOS)");
            }
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Hayat App Location Permission',
                        message: 'Hayat needs access to your location to show nearby restaurants.',
                        buttonPositive: 'Allow',
                        buttonNegative: 'Deny',
                        buttonNeutral: 'Never Ask Again',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("PermissionsAndroid.RESULTS.GRANTED");
                    getLocation(); // Call function to get location after permission granted
                } else {
                    console.log("PermissionsAndroid else called => " + granted);
                }
            } catch (err) {
                console.error('Error requesting location permission (Android):', err);
            }
        }
    };

    const getLocation = async () => {
        Geolocation.getCurrentPosition(
            async (pos) => {
                console.log('Error requesting location permission (Android):', pos.coords.latitude);
                try {
                    const Geocoder = NativeModules.Geocoder;
                    const address = await Geocoder.reverseGeocode(latitude, longitude);
                    return address;
                  } catch (error) {
                    console.error('Error getting address:', error);
                    return null;
                  }
            },
            (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hayat Location Permission</Text>
            <Button title="Allow Location" onPress={handleRequestPermission} style={styles.button} />
            {hasLocationPermission ? (
                <Text style={styles.text}>Location access granted!</Text>
            ) : (
                <>
                    <Text style={styles.text}>
                        Zomato needs your location to show nearby restaurants. Please allow location access for a better experience.
                    </Text>
                    <Button title="Allow Location" onPress={handleRequestPermission} style={styles.button} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        width: '50%',
    },
});

export default PermissionScreen;

import { View, Image, StyleSheet, PermissionsAndroid, Permissions } from "react-native";
import { StackActions } from '@react-navigation/native';
import { getLoggedUser } from "../services/StorageUtils";
import { useEffect } from "react";
import { getLocation } from "../utils/LocationUtility";
import { getAddressFromLocation } from "../utils/GeocodingUtility";



const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const location = await getLocation();
        //         const address = await getAddressFromLocation(location.latitude, location.longitude);

        //         console.log('Location:', location);
        //         console.log('Address:', address);
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // };

        // fetchData();
    }, [])

    setTimeout(async function () {
        await getLoggedUser().then((value) => {
            const screen = value != "" && value != null ? 'TabNavigator' : 'Login'
            navigation.dispatch(
                StackActions.replace(screen)
            );
        })
    }, 4000);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../images/logo.png')}
                style={styles.image} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        height: 250,
        width: 350,
    },
});

export default SplashScreen;
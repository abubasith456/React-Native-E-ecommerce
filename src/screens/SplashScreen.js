import { View, Image, StyleSheet, PermissionsAndroid, Permissions } from "react-native";
import { StackActions } from '@react-navigation/native';
import { getLoggedUser } from "../services/StorageUtils";
import { useEffect, useState } from "react";
import { getLocation } from "../utils/LocationUtility";
import { getAddressFromLocation } from "../utils/GeocodingUtility";
import { initializeAsyncStorage, getUserData } from "../repositories/localRepo";



const SplashScreen = ({ navigation }) => {

    const [userData, setUserData] = useState([]);

    const loadUser = () => {
        // Retrieve cart items from the database
        getUserData(setUserData);
    };

    useEffect(() => {
        const fetchData = async () => {
            loadUser();
            setTimeout(async () => {
                const test = userData != [] ? 'Home' : 'Login';
                navigation.dispatch(StackActions.replace(test));
                // await getUserData.then((value) => {
                //     console.log('User Data:', value);
                //     console.log("SPLASH ==> " + value); // Use optional chaining to avoid null/undefined errors
                //     const screen = value != [] && value != null ? 'Permission' : 'Login';
                //     navigation.dispatch(StackActions.replace(screen));
                // });
            }, 4000);
        };

        fetchData();
    }, [])

    // setTimeout(async function () {
    //     await getLoggedUser().then((value) => {
    //         console.log("SPLASH ==> " + userData.user_id);
    //         const screen = value != "" && value != null ? 'Home' : 'Login'
    //         navigation.dispatch(
    //             StackActions.replace(screen)
    //         );
    //     })
    // }, 4000);

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
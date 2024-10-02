import { View, Image, StyleSheet } from "react-native";
import SignUpScreen from "./auth/SignUpScreen";
import remoteConfig from '@react-native-firebase/remote-config';
import { useEffect } from "react";
import { setBaseUrl } from "../services/RemoteConfig";
import { getUserData } from "../repositories/localRepo";
import { StackActions } from "@react-navigation/native";



const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        // Function to fetch remote config values
        const fetchRemoteConfig = async () => {
            try {
                // Set default values for the remote config
                await remoteConfig().setDefaults({
                    base_url: 'https://hayat-shop.onrender.com', // Default URL
                });

                // Fetch and activate remote config
                const fetchedRemotely = await remoteConfig().fetchAndActivate();

                if (fetchedRemotely) {
                    console.log('Configs were retrieved from the backend and activated.');
                } else {
                    console.log('No configs were fetched from the backend, using local defaults.');
                }

                // Get the updated config value after activation
                const baseUrl = remoteConfig().getValue('base_url').asString();
                console.log('Fetched Base URL:', baseUrl);
                setBaseUrl(baseUrl);
            } catch (error) {
                console.log('Error fetching remote config:', error);
            }
        };

        const fetchData = async () => {
            try {
                // Call getUserData and handle the result
                console.log("User DATA? =>");
                getUserData((userData) => {
                    console.log("User DATA? =>", userData);
                    setTimeout(async () => {
                        if (userData && Object.keys(userData).length > 0) {
                            // User data exists, navigate to home screen
                            navigation.dispatch(StackActions.replace("Home"));
                        } else {
                            // No user data, navigate to login screen
                            navigation.dispatch(StackActions.replace("Login"));
                        }
                    }, 4000);
                });
            } catch (error) {
                console.error('Error checking user data:', error);
                // Handle error (e.g., navigate to a fallback screen or show an error message)
                navigation.dispatch(StackActions.replace("Login"));
            } finally {
                // Ensure loading state is updated
                setLoading(false);
            }
        };

        fetchData();
        fetchRemoteConfig();
    }, [navigation]);

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
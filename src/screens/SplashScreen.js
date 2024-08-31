import { View, Image, StyleSheet } from "react-native";
import { StackActions } from '@react-navigation/native';
import { useEffect } from "react";
import { getUserData } from "../repositories/localRepo";
import LoginScreen from "./auth/LoginScreen";
import SignUpScreen from "./auth/SignUpScreen";



const SplashScreen = ({ navigation }) => {

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Call getUserData and handle the result
    //             console.log("User DATA? =>");
    //             getUserData((userData) => {
    //                 console.log("User DATA? =>", userData);
    //                 setTimeout(async () => {
    //                     if (userData && Object.keys(userData).length > 0) {
    //                         // User data exists, navigate to home screen
    //                         navigation.dispatch(StackActions.replace("Home"));
    //                     } else {
    //                         // No user data, navigate to login screen
    //                         navigation.dispatch(StackActions.replace("Login"));
    //                     }
    //                 }, 4000);
    //             });
    //         } catch (error) {
    //             console.error('Error checking user data:', error);
    //             // Handle error (e.g., navigate to a fallback screen or show an error message)
    //             navigation.dispatch(StackActions.replace("Login"));
    //         } finally {
    //             // Ensure loading state is updated
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Image source={require('../images/logo.png')}
                style={styles.image} /> */}
            <SignUpScreen />
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
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "../screens/SplashScreen"
import Login from "../screens/LoginScreen"
import SignUp from "../screens/SignUpScreen"
import Forgot from "../screens/ForgotPasswordScreen"
import OTP from "../screens/OTPVerificationScren"
import { Button, StyleSheet } from 'react-native'
import HomeScreen from "./TabNavigation";
import UpdatePasswordScreen from "../screens/UpdatePassword";
import BannerScreen from "../screens/BannerScreen";
import ProductDetailsScreen from '../screens/DetailsScreen'
import ProductScreen from "../screens/ProductsScreen";
import ProfileScreen from "../screens/ProfileScreen"
import OrdersScreen from "../screens/OrdersListscrean";
// import WelcomeScreen from "../screens/WelcomeScreen";
import CartScreen from "../screens/CartScreen";
import AddressScreen from "../screens/AddressScreen";
import OrderSummaryScreen from "../screens/OrderSummeryScreen";



export default function RootStack() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{
            headerBackTitleVisible: false
        }}>
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Forgot" component={Forgot} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Banner" component={BannerScreen} options={{
                headerShown: true
            }} />
            <Stack.Screen name="OTP" component={OTP} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{

            }} />
            <Stack.Screen name="Products" component={ProductScreen} options={{

            }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{

            }} />
            <Stack.Screen name="Orders" component={OrdersScreen} options={{

            }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{

            }} />
            <Stack.Screen name="Address" component={AddressScreen} options={{

            }} />
            <Stack.Screen name="OrderSummery" component={OrderSummaryScreen} options={{

            }} />
            {/* <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
                headerShown: false,
            }} /> */}
            {/* <Stack.Screen name="Home" component={Home} options={{
                headerStyle: {
                    backgroundColor: '#3498db', // Set the background color of the app bar
                },
                headerTintColor: '#fff', // Set the text color of the app bar
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <Button
                        style={styles.button}
                        onPress={() => navigation.navigate('Login', {
                            item: "Abu"
                        })}
                        title="LOGOUT"
                        color="#fff"
                    />
                ),
            }} />
            <Stack.Screen name="Details" component={Details} />
            // <Stack.Screen name="Banner" component={BannerScreen} options={{
            //     headerShown: false
            // }} /> */}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
        backgroundColor: "#00BFFF",
        fontStyle: "normal",
        fontWeight: "bold"
    },

})
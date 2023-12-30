// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/HomeScreen";
import { Button, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { loggedInUser } from '../services/StorageUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme/Theme';



import { MenuScreen } from '../screens/MenuScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (route.name === 'Menu') {
                    iconName = focused ? 'listt' : 'ios-list-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: 'gray',
        })}
        >
            <Tab.Screen key="1" name="Home" component={Home} options={{
                headerShown: false,
            }} />

            <Tab.Screen key="2" name="Menu" component={MenuScreen} options={{
                headerStyle: {
                    backgroundColor: '#3498db', // Set the background color of the app bar
                },
                headerTintColor: '#fff', // Set the text color of the app bar
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />

        </Tab.Navigator>
    );
};

export default TabNavigator;

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

import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { store } from './redux/store/configureStore';
import RootStack from './router/Navigator';
import NotificationController from './services/FirebaseMessagingService';
import { useAppActive, useAppInactive } from 'react-native-lifecycle';



export default function App() {
    // Called when the application switches from the background to the foreground
    useAppActive(() => {
      console.log("APP IN ACTIVE");
    });

    // Called when the application switches from the foreground to background
    useAppInactive(() => {
      console.log("APP IN IN-ACTIVE");
    });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NotificationController />
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

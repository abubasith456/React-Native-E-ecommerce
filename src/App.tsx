import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './router/Navigator';
import { Provider } from 'react-redux'
import { store } from './redux/store/configureStore';



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { store } from './redux/store/configureStore';
import RootStack from './router/Navigator';



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

import { AsyncStorage } from 'react-native';

// Save data to AsyncStorage
const saveCardData = async (cardData) => {
  try {
    await AsyncStorage.setItem('cardData', JSON.stringify(cardData));
    console.log('Card data saved successfully');
  } catch (error) {
    console.error('Error saving card data:', error);
  }
};

// Retrieve data from AsyncStorage
const getCardData = async () => {
  try {
    const storedData = await AsyncStorage.getItem('cardData');
    if (storedData !== null) {
      const cardData = JSON.parse(storedData);
      console.log('Retrieved card data:', cardData);
      return cardData;
    } else {
      console.log('No card data found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving card data:', error);
    return null;
  }
};

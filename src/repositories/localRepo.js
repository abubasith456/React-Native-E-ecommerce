
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';


const CART_KEY = 'CART_KEY';
const USER_DATA_KEY = 'USER_DATA_KEY';

// Function to initialize AsyncStorage
export const initializeAsyncStorage = () => {
    AsyncStorage.setItem(CART_KEY, JSON.stringify([])); // Empty array for cart
    AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify({})); // Empty object for user data
};

// CART
export const addCartItem = async (data, callback) => {
    if (!data) {
        callback({ success: false, message: "Data not available" });
        return;
    }

    try {
        // Get existing cart data
        const existingCart = JSON.parse(await AsyncStorage.getItem(CART_KEY)) || [];

        // Add unique IDs to new items
        const itemsWithIds = data.map(item => ({ ...item, id: uuidv4() }));

        // Add new items
        existingCart.push(...itemsWithIds);

        // Save updated cart data
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(existingCart));

        console.log("Items added successfully");
        callback({ success: true, message: "Items added successfully" });
    } catch (error) {
        console.error("Error adding items to cart: ", error);
        callback({ success: false, message: "Error adding to cart" });
    }
};

export const getLocalData = async (setCartItems) => {
    try {
        // Retrieve cart data
        const cartData = JSON.parse(await AsyncStorage.getItem(CART_KEY)) || [];

        console.log("Data retrieved successfully  =>" + cartData);


        setCartItems(cartData);
    } catch (error) {
        console.log("Error retrieving data: ", error.message);
    }
};

export const deleteItem = async (id, callback) => {
    try {
        // Get existing cart data
        const existingCart = JSON.parse(await AsyncStorage.getItem(CART_KEY)) || [];

        // Filter out the item to delete
        const updatedCart = existingCart.filter(item => item.id !== id);

        // Save updated cart data
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));

        console.log("Item deleted successfully");

        // Call the callback function if provided
        if (callback) {
            callback();
        }
    } catch (error) {
        console.log("Error deleting item: ", error.message);
    }
};


export const deleteAllCartItems = async () => {
    try {
        // Clear cart data
        await AsyncStorage.setItem(CART_KEY, JSON.stringify([]));

        console.log("All items deleted successfully");
    } catch (error) {
        console.log("Error deleting items: ", error.message);
    }
};

// USER DB
export const insertUserData = async (userData) => {
    try {
        const userDataString = JSON.stringify(userData);
        await AsyncStorage.setItem(USER_DATA_KEY, userDataString);
        console.log('User data added successfully to AsyncStorage');
    } catch (error) {
        console.error('Error adding user data to AsyncStorage: ', error);
    }
};

export const getUserData = async (setUserData) => {
    try {
        const userDataString = await AsyncStorage.getItem(USER_DATA_KEY);
        if (userDataString) {
            const userData = JSON.parse(userDataString) || [];
            setUserData(userData);
            console.log('User data retrieved successfully from AsyncStorage');
        } else {
            console.log('No user data found in AsyncStorage');
        }
    } catch (error) {
        console.error('Error retrieving user data from AsyncStorage: ', error);
    }
};

export const updateUserData = async (updatedUserData) => {
    try {
        const userDataString = JSON.stringify(updatedUserData);
        await AsyncStorage.setItem(USER_DATA_KEY, userDataString);
        console.log('User data updated successfully in AsyncStorage');
    } catch (error) {
        console.error('Error updating user data: ', error);
    }
};

export const deleteUserData = async () => {
    try {
        await AsyncStorage.removeItem(USER_DATA_KEY);
        console.log('User data deleted successfully from AsyncStorage');
    } catch (error) {
        console.error('Error deleting user data: ', error);
    }
};

export const deleteAllAsyncStorageData = async () => {
    try {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify([]));
        console.log('All data in AsyncStorage cleared successfully');
    } catch (error) {
        console.error('Error clearing AsyncStorage: ', error);
    }
};
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
    }
};


export const loggedInUser = async (value) => {
    try {
        console.log(value)
        await AsyncStorage.setItem("loggedIn", value);
    } catch (e) {
        console.log(e)
    }
};

export const getLoggedUser = async () => {
    try {
        const value = await AsyncStorage.getItem("loggedIn");
        if (value != null) {
            return value
        } else {
            return ""
        }
    } catch (e) {
        // error reading value
        console.log(e)
        return ""
    }
};


export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        } else {
            return ""
        }
    } catch (e) {
        // error reading value
        console.log(e)
        return ""
    }
};

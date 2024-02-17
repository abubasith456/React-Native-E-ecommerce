// AddressStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const ADDRESS_STORAGE_KEY = 'addresses';
const DEFAULT_ADDRESS_KEY = 'defaultAddressId';

export const loadAddresses = async () => {
  try {
    const storedAddresses = await AsyncStorage.getItem(ADDRESS_STORAGE_KEY);
    return JSON.parse(storedAddresses) || [];
  } catch (error) {
    console.error('Error loading addresses:', error);
    return [];
  }
};

export const saveAddress = async (address) => {
  const addresses = await loadAddresses();
  const existingIndex = addresses.findIndex(
    (a) =>
      a.name === address.name &&
      a.addressLine1 === address.addressLine1 &&
      a.addressLine2 === address.addressLine2 &&
      a.area === address.area &&
      a.pincode === address.pincode &&
      a.phoneNumber === address.phoneNumber
  );

  if (existingIndex !== -1) {
    addresses[existingIndex] = { ...address, id: addresses[existingIndex].id };
  } else {
    // If it's a new address, add a new id
    const newAddress = { ...address, id: uuidv4() };
    addresses.push(newAddress);
  }

  await AsyncStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  return addresses;
};

export const deleteAddress = async (index) => {
  const addresses = await loadAddresses();
  addresses.splice(index, 1);
  await AsyncStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  return addresses;
};

export const getAddressById = async (id) => {
  console.log(id)
  try {
    const storedAddresses = await AsyncStorage.getItem(ADDRESS_STORAGE_KEY);
    const addresses = JSON.parse(storedAddresses) || [];

    if (id) {
      // If an id is provided, find and return the address with that id
      const foundAddress = addresses.find((address) => address.id == id);
      console.log("Founded -==> " + foundAddress)
      return foundAddress || null; // Return null if not found
    }
    console.log("Not -==> " + addresses)
    return addresses;
  } catch (error) {
    console.error('Error loading addresses:', error);
    return [];
  }
};

export const getDefaultAddressId = async () => {
  try {
    const storedDefaultAddressId = await AsyncStorage.getItem(DEFAULT_ADDRESS_KEY);
    return storedDefaultAddressId || null;
  } catch (error) {
    console.error('Error getting default address id:', error);
    return null;
  }
};

export const setDefaultAddress = async (id) => {
  try {
    await AsyncStorage.setItem(DEFAULT_ADDRESS_KEY, id.toString());
  } catch (error) {
    console.error('Error setting default address id:', error);
  }
};
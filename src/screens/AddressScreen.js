// AddressScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { loadAddresses, saveAddress, deleteAddress, getDefaultAddressId, setDefaultAddress } from '../services/AsyncStorageUtils';
import Modal from 'react-native-modal';
import { TextInput as PaperTextInput } from 'react-native-paper'
import { theme } from '../theme/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button'
import { showConfirmationAlert } from '../components/dialoges/AlertDialogs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressScreen = ({ navigation }) => {
    const [address, setAddress] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '',
        area: '',
        pincode: '',
        phoneNumber: '',
    });
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [defaultAddressId, setDefaultAddressId] = useState("");

    //Field valid validations
    const validateField = (fieldName, text, setValidation) => {
        const isValid = text != ''; // Example: Field should not be empty
        setValidation(isValid);
        setAddress({ ...address, [fieldName]: text });
    };
    const [isNameValid, setNameValid] = useState(true);
    const [isAddress1Valid, setAddress1Valid] = useState(true);
    const [isAddress2Valid, setAddress2Valid] = useState(true);
    const [isAreaValid, setAreaValid] = useState(true);
    const [isPinCodeValid, setPinCodeValid] = useState(true);
    const [isPhoneNumValid, setPhoneNumValid] = useState(true);
    // Function to check if all fields are valid
    const areAllFieldsValid = () => {
        return isNameValid && isAddress1Valid && isAddress2Valid && isPinCodeValid && isPhoneNumValid;
    };


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.appBarButton} onPress={toggleModal}>
                    <FontAwesomeIcon icon={faAdd} style={{ color: theme.colors.primary }} size={20} />
                </TouchableOpacity>
            ),
        });
        // Load existing addresses from AsyncStorage
        loadAddresses().then(setAddresses);

        // Retrieve default address ID from AsyncStorage
        getDefaultAddressId().then((storedDefaultAddressId) => {
            console.log(storedDefaultAddressId)
            if (storedDefaultAddressId) {
                setDefaultAddressId(storedDefaultAddressId);
            }
        });
    }, [navigation, isModalVisible]);

    const setAsDefaultAddress = (id) => {
        setDefaultAddressId(id);
        setDefaultAddress(id.toString());
    };

    const checkIsDefaultAddress = (id) => {
        return defaultAddressId == id
    }

    const toggleModal = () => {
        resetAddressField();
        setModalVisible(!isModalVisible);
    };

    // Function to handle the "Add" button click
    const handleAddButtonClick = () => {

        validateField('name', address.name, setNameValid);
        validateField('addressLine1', address.addressLine1, setAddress1Valid);
        validateField('addressLine2', address.addressLine2, setAddress2Valid);
        validateField('pincode', address.pincode, setPinCodeValid);
        validateField('phoneNumber', address.phoneNumber, setPhoneNumValid);

        if (areAllFieldsValid()) {
            // All fields are valid, proceed with adding the address
            handleSaveAddress(); // Or any other action you want to perform
        } else {
            // Display an error message or take appropriate action
            alert('Please fill in all the required fields.');
        }
    };

    const handleSaveAddress = async () => {
        const updatedAddresses = await saveAddress(address);
        setAddresses(updatedAddresses);
        setModalVisible(false);
        resetAddressField();
    };

    const resetAddressField = () => {
        setAddress({
            name: '',
            addressLine1: '',
            addressLine2: '',
            area: '',
            pincode: '',
            phoneNumber: '',
        });
    }

    const handleDeleteAddress = async (index, item) => {
        console.log(checkIsDefaultAddress(item.id))
        showConfirmationAlert(
            'Confirmation!',
            'Are you sure, do you want to delete this address?',
            "Yes",
            "No",
            async () => {
                if (checkIsDefaultAddress(item.id)) {
                    setAsDefaultAddress("")
                }
                const updatedAddresses = await deleteAddress(index);
                setAddresses(updatedAddresses);
            },
            () => { }
        );
    };

    const renderAddressItem = ({ item, index }) => (
        <View style={styles.addressCard}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.addressLine1}</Text>
            <Text style={styles.cardText}>{item.addressLine2}</Text>
            <Text style={styles.cardText}>{item.area}</Text>
            <Text style={styles.cardText}>{item.pincode}</Text>
            <Text style={styles.cardText}>{item.phoneNumber}</Text>
            <View style={styles.deleteButtonContainer}>
                {/* Delete Button */}
                <Button mode="contained" onPress={() => handleDeleteAddress(index, item)}>
                    Delete
                </Button>
            </View>
            {/* Set Default Button */}
            <View style={[styles.setDefaultButtonContainer]}>
                <TouchableOpacity
                    style={styles.setDefaultButton}
                    disabled={checkIsDefaultAddress(item.id) ? true : false}
                    onPress={() => setAsDefaultAddress(item.id)}
                >
                    <Text style={[styles.setDefaultButtonText, { color: checkIsDefaultAddress(item.id) ? 'green' : theme.colors.primary }]}>
                        {checkIsDefaultAddress(item.id) ? 'Setted as default' : 'Set as Default'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContainer}>
                    <PaperTextInput
                        style={styles.input}
                        placeholderTextColor="grey"
                        placeholder="Name"
                        selectionColor={theme.colors.primary}
                        mode="outlined"
                        outlineColor={theme.colors.primary}
                        value={address.name}
                        onChangeText={(text) => validateField('name', text, setNameValid)}
                        underlineColorAndroid={isNameValid ? 'black' : 'red'}
                    />
                    <PaperTextInput
                        style={styles.input}
                        placeholder="Address Line 1"
                        placeholderTextColor="grey"
                        selectionColor={theme.colors.primary}
                        mode="outlined"
                        outlineColor={theme.colors.primary}
                        value={address.addressLine1}
                        onChangeText={(text) => validateField('addressLine1', text, setAddress1Valid)}
                        underlineColorAndroid={isAddress1Valid ? 'black' : 'red'}
                    />
                    <PaperTextInput
                        style={styles.input}
                        placeholder="Address Line 2"
                        placeholderTextColor="grey"
                        selectionColor={theme.colors.primary}
                        mode="outlined"
                        outlineColor={theme.colors.primary}
                        value={address.addressLine2}
                        onChangeText={(text) => validateField('addressLine2', text, setAddress2Valid)}
                        underlineColorAndroid={isAddress2Valid ? 'black' : 'red'}
                    />
                    <PaperTextInput
                        style={styles.input}
                        placeholder="Area"
                        placeholderTextColor="grey"
                        selectionColor={theme.colors.primary}
                        mode="outlined"
                        outlineColor={theme.colors.primary}
                        value={address.area}
                        onChangeText={(text) => validateField('area', text, setAreaValid)}
                        underlineColorAndroid={isAreaValid ? 'black' : 'red'}
                    />
                    <PaperTextInput
                        style={styles.input}
                        placeholder="Pincode"
                        selectionColor={theme.colors.primary}
                        mode="outlined"
                        outlineColor={theme.colors.primary}
                        placeholderTextColor="grey"
                        value={address.pincode}
                        onChangeText={(text) => validateField('pincode', text, setPinCodeValid)}
                        underlineColorAndroid={isPinCodeValid ? 'black' : 'red'}
                    />
                    <PaperTextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="grey"
                        selectionColor={theme.colors.primary}
                        mode="outlined"
                        keyboardType='number-pad'
                        textContentType="emailAddress"
                        outlineColor={theme.colors.primary}
                        value={address.phoneNumber}
                        onChangeText={(text) => validateField('phoneNumber', text, setPhoneNumValid)}
                        underlineColorAndroid={isPhoneNumValid ? 'black' : 'red'}
                    />
                    <Button mode="contained" onPress={handleAddButtonClick} >
                        ADD ADDRESS
                    </Button>
                </View>
            </Modal>

            {/* ... Existing addresses list ... */}
            {addresses == [] || addresses.length == 0 ? <View style={styles.noItemText}>
                <Text style={{ color: "black" }} > No address added yet!</Text>
            </View> : <FlatList
                data={addresses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAddressItem}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    appBarButton: {
        marginRight: 5,
    },
    addressCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 8,
        padding: 16,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        elevation: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 8,
    },
    cardText: {
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    deleteButtonContainer: {
        marginTop: 10,
        fontSize: 18,
    },
    setDefaultButtonContainer: {
        alignItems: "flex-end",

        alignSelf: "flex-end"
    },

    setDefaultButton: {
        backgroundColor: 'transparent',
        padding: 10,
    },

    setDefaultButtonText: {
        color: theme.colors.primary,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
    },
    input: {
        height: 50,
        backgroundColor: theme.colors.surface,
        color: 'black', // Set the text color
        marginBottom: 10,
        padding: 4,
    },
    noItemText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: "black"
    },
});

export default AddressScreen;

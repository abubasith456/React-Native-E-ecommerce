import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ImagePickerDialog = ({ onPickImage, onCancel, isVisible }) => {
    // const [isVisible, setIsVisible] = useState(false);

    console.log(" called ImagePickerDialog ")

    const handlePickImage = (useCamera) => {
        onPickImage(useCamera); // Pass a flag indicating camera or gallery
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.baseContainer}>
                <View style={styles.modalContainer}>
                    <Text>Choose an option:</Text>
                    <Button title="Take Photo" onPress={() => handlePickImage(true)} style={styles.button} />
                    <View style={styles.buttonMargin} />
                    <Button title="Choose from Gallery" onPress={() => handlePickImage(false)} style={styles.button} />
                    <View style={styles.buttonMargin} />
                    <Button title="Cancel" onPress={onCancel} style={styles.button} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: "80%",
        backgroundColor: '#fff', // White background
        padding: 20,
        borderRadius: 10, // Rounded corners
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 5, // Shadow elevation for Android
    },
    text: {
        fontSize: 18, // Text size
        marginBottom: 15, // Margin below text
    },
    buttonContainer: {
        flexDirection: 'row', // Arrange buttons horizontally
        justifyContent: 'space-around', // Distribute buttons evenly
        marginTop: 15, // Margin above buttons
    },
    button: {
        flex: 1, // Make buttons take up equal space
    },
    buttonMargin: {
        marginVertical: 5, // Adjust the vertical margin as needed
    },
});

export default ImagePickerDialog;

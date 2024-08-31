import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageLoader = () => (
    <View style={styles.container}>
        <FastImage source={require('../images/loading.gif')} // Replace with your loading image or GIF
            style={styles.image}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Optional: Semi-transparent background
    },
    image: {
        width: 100, // Adjust width according to your preference
        height: 100, // Adjust height according to your preference
    },
});

export default ImageLoader;

import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackButton({ goBack }) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <FontAwesomeIcon style={styles.image} icon={faArrowLeft} size={20} />
            {/* <Image
                style={styles.image}
                source={require('../images/arrow_back.png')}
            /> */}
        </TouchableOpacity>
    )
}

export const BackButtonWithText = ({ navigation, title }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                <Ionicons name="arrow-back-white" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 5,
    },
    image: {
        width: 25,
        height: 25,
        color: "white"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // Header background color
        height: 60,
        paddingHorizontal: 16,
    },
    backWithText: {
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 16,
    },
    backButton: {
        marginRight: 8,
        color: "white",
    },
    backButtonPlaceholder: {
        width: 40, // Width of the back button placeholder to align the title
    },
    title: {
        fontSize: 18,
        color: 'white',
    },
})
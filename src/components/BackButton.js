import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BackButton({ goBack }) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Image
                style={styles.image}
                source={require('../images/arrow_back.png')}
            />
        </TouchableOpacity>
    )
}

export const BackButtonWithText = ({ navigation, title }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30 + getStatusBarHeight(),
        left: 1,
    },
    image: {
        width: 25,
        height: 25,
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
    },
    backButtonPlaceholder: {
        width: 40, // Width of the back button placeholder to align the title
    },
    title: {
        fontSize: 18,
        color: 'white',
    },
})
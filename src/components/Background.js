import React from 'react'
import { ScrollView } from 'react-native';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default function Background({ children }) {
    return (
        <ImageBackground
            source={require('../images/background_dot.png')}
            resizeMode="repeat"
            style={styles.background}
        >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        padding: 15,
        width: '100%',
        maxWidth: 390,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

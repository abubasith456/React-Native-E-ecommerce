import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme/Theme';

const CenteredButton = ({ onPress, title, style }) => {

    /* <TouchableOpacity style={styles.button}>
                     <LinearGradient colors={['#43A047', '#66BB6A']} style={styles.gradient}>
                         <Text style={styles.buttonText}>Sing Up</Text>
                     </LinearGradient>
                 </TouchableOpacity> */ //Gradient color button

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: theme.colors.primaryBtnBg,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default CenteredButton;

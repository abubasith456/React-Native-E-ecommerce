import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const LoaderModal = ({ isVisible }) => {
    return (
        <Modal
            transparent
            animationType="slide"
            visible={isVisible}
            onRequestClose={() => { }}
        >
            <View style={styles.loaderContainer}>
                <View style={styles.loaderSquare}>
                    <ActivityIndicator size="large" color="skyblue" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderSquare: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoaderModal;

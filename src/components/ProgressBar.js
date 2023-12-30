import React from 'react'
import { ActivityIndicator } from "react-native";
import Modal from 'react-native-modal';
import { theme } from '../theme/Theme';

export default Progress = ({ isLoading }) => {
    return (
        <Modal isVisible={isLoading}>
            {/* Add your loading indicator or any content for the progress dialog */}
            {/* For example, you can use ActivityIndicator or any custom component */}
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </Modal>
    );
};
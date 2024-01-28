
import { Alert } from 'react-native';

export const showConfirmationAlert = (title, message, possitiveButtonText, negativebuttonText,onYesPress, onCancelPress) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: negativebuttonText,
        style: 'cancel',
        onPress: onCancelPress,
      },
      {
        text: possitiveButtonText,
        onPress: onYesPress,
      },
    ],
    { cancelable: false }
  );
};
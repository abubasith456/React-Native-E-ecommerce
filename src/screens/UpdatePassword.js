import React, { useEffect, useState, useRef } from 'react'
import { Animated, TouchableOpacity, StyleSheet, View, Easing, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { confirmPasswordValidator, passwordValidator } from '../helper/PasswordValidator'
import Progress from '../components/ProgressBar'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword } from '../repositories/apiRepo';
import ShowDialog from '../components/Dailog'
import { resetState } from '../redux/loginRedux/loginSlice'
import { loggedInUser } from '../services/StorageUtils'
import { TextInput as PaperTextInput, IconButton } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
    const [newPassword, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    const [showPassword, setShowPassword] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { data, isLoader, isError } = useSelector(state => state.login);
    const initialValue = 0;
    const translateValue = useRef(new Animated.Value(initialValue)).current;

    useEffect(() => {
        if (data != null) {
            if (data.status == 200) {
                dispatch(resetState())
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Login',
                    })
                )
            } else {
                setVisible(true)
            }
        } else {
            if (isError) {
                setVisible(true)
            }
        }
    }, [data, isLoader, isError, translateValue])

    const onUpdatePressed = () => {
        const newPasswordError = passwordValidator(newPassword.value)
        const confirmPasswordError = confirmPasswordValidator(confirmPassword.value)
        if (newPasswordError || confirmPasswordError) {
            setPassword({ ...newPassword, error: newPasswordError })
            setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
            return
        }
        const email = route.params.email
        const passwordValue = newPassword.value
        const confirmPasswordValue = confirmPassword.value
        dispatch(updatePassword({ email, passwordValue, confirmPasswordValue }))
    }

    function onDialogPressed() {
        setVisible(false)
        resetValues();
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function resetValues() {
        setPassword({ value: '', error: '' });
        setConfirmPassword({ value: '', error: '' });
    }

    function goBack() {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Login',
            })
        )
    }

    return (
        <Background>
            {isLoader ? <Progress isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <BackButton goBack={goBack} />
            <View style={styles.cardContainer}>
                <Header>Update your password</Header>
                <TextInput
                    label="Mew Password"
                    returnKeyType="next"
                    value={newPassword.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!newPassword.error}
                    errorText={newPassword.error}
                    autoCapitalize="none"
                    autoCompleteType="password"
                    textContentType="password"
                />
                <TextInput
                    label="Confirm password"
                    returnKeyType="done"
                    value={confirmPassword.value}
                    onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                    error={!!confirmPassword.error}
                    errorText={confirmPassword.error}
                    secureTextEntry={showPassword}
                    right={
                        <PaperTextInput.Icon
                            style={styles.passwordRightIcon}
                            name={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                        />
                    }
                />
                <Button mode="contained" onPress={onUpdatePressed}>
                    Update
                </Button>
            </View>
        </Background>

    )
}


export default LoginScreen

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        alignItems: "center",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Android specific
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    passwordRightIcon: {
        color: 'black',
    }
})
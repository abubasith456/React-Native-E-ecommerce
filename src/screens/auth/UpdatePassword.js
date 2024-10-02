
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { resetState } from '../../redux/loginRedux/loginSlice'
import { updatePassword } from '../../repositories/apiRepo';
import TextInput from '../../components/TextInput'
import Background from '../../components/Background';
import { CommonActions } from '@react-navigation/native';
import { confirmPasswordValidator, passwordValidator } from '../../helper/PasswordValidator'
import ShowDialog from '../../components/Dailog'
import CenteredButton from "../../components/button/Button";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ProgressBar from '../../components/ProgressBar';
import BackButton from '../../components/BackButton';


const UpdatePassword = ({ navigation }) => {

    const [newPassword, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    const [showPassword, setShowPassword] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { data, isLoader, isError } = useSelector(state => state.updatePassword);

    useEffect(() => {
        if (data != null) {
            if (data.status == 200) {
                dispatch(resetState());
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Login',
                    })
                );
            } else {
                setVisible(true)
            }
        } else {
            if (isError) {
                setVisible(true)
            }
        }
    }, [data, isLoader, isError])

    const onUpdatePressed = () => {
        const newPasswordError = passwordValidator(newPassword.value)
        const confirmPasswordError = confirmPasswordValidator(newPassword.value, confirmPassword.value)
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
    }

    function resetValues() {
        setEmail({ value: '', error: '' });
        setPassword({ value: '', error: '' });
    }

    function goBack() {
        console.log(" --> goBack ")
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Login',
            })
        )
    }

    return (
        <Background>
            {isLoader ? <ProgressBar isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <BackButton goBack={goBack} />
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../../images/logo.png")}
                />

                <Text style={styles.title}>Update your password</Text>
                <Text style={styles.subtitle}>Enter your prefered password.</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>New Password:</Text>
                    <TextInput
                        label="New Password"
                        returnKeyType="next"
                        value={newPassword.value}
                        onChangeText={(text) => setPassword({ value: text, error: '' })}
                        error={!!newPassword.error}
                        errorText={newPassword.error}
                        autoCapitalize="none"
                        autoCompleteType="password"
                        textContentType="password"
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm password:</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            label="Confirm password"
                            returnKeyType="done"
                            value={confirmPassword.value}
                            onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                            error={!!confirmPassword.error}
                            errorText={confirmPassword.error}
                            secureTextEntry={showPassword}
                            autoCapitalize="none" />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                <CenteredButton
                    title="Update"
                    mode="contained"
                    onPress={onUpdatePressed}
                    style={styles.button}
                />
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 40
    },
    inputContainer: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    logo: {
        height: 100, // Adjust height as needed
        width: "100%",  // Adjust width as needed
        marginBottom: 25,
        marginTop: 50
    },
    button: {
        paddingVertical: 10,
    }
});

export default UpdatePassword;

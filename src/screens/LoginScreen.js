import React, { useEffect, useState, useRef } from 'react'
import { Animated, TouchableOpacity, StyleSheet, View, Easing, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { CommonActions } from '@react-navigation/native';
import { theme } from '../theme/Theme'
import { emailValidator } from '../helper/EmailValidator'
import { passwordValidator } from '../helper/PasswordValidator'
import Progress from '../components/ProgressBar'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../repositories/apiRepo';
import ShowDialog from '../components/Dailog'
import { resetState } from '../redux/loginRedux/loginSlice'
import { loggedInUser } from '../services/StorageUtils'
import { TextInput as PaperTextInput, IconButton } from 'react-native-paper';
import { insertUserData } from '../repositories/localRepo'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [showPassword, setShowPassword] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { data, isLoader, isError } = useSelector(state => state.login);
    const initialValue = 0;
    const translateValue = useRef(new Animated.Value(initialValue)).current;

    useEffect(() => {
        if (data != null) {
            if (data.status == 200) {
                const userId = data.userData.user_id
                loggedInUser(userId.toString());
                const userData = {
                    user_id: userId,
                    username: data.userData.username,
                    email: data.userData.email,
                    dateOfBirth: data.userData.dateOfBirth,
                    mobileNumber: data.userData.mobileNumber,
                    role: data.userData.role,
                };
                insertUserData(userData);
                dispatch(resetState());
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            } else {
                setVisible(true)
            }
        } else {
            if (isError) {
                setVisible(true)
            }
        }
    }, [data, isLoader, isError, translateValue])

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        const emailValue = email.value
        const passwordValue = password.value
        dispatch(login({ emailValue, passwordValue }))
    }

    function onDialogPressed() {
        setVisible(false)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function resetValues() {
        setEmail({ value: '', error: '' });
        setPassword({ value: '', error: '' });
    }

    return (
        <Background>
            {isLoader ? <Progress isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <View style={styles.cardContainer}>
                <Header>Welcome back.</Header>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry={showPassword}
                    right={
                        <PaperTextInput.Icon
                            style={styles.passwordRightIcon}
                            name={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                        />
                    }
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => {
                            resetValues();
                            navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'Forgot',
                                })
                            )
                        }
                        }
                    >
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button mode="contained" onPress={onLoginPressed}>
                    Login
                </Button>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => {
                        resetValues();
                        navigation.dispatch(
                            CommonActions.navigate({
                                name: 'SignUp',
                            })
                        )
                    }
                    }>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
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
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Android specific
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 10,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
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
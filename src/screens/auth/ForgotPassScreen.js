import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { resetState } from '../../redux/loginRedux/loginSlice'
import { login } from '../../repositories/apiRepo';
import TextInput from '../../components/TextInput'
import Background from '../../components/Background';
import { CommonActions } from '@react-navigation/native';
import { theme } from '../../theme/Theme'
import { emailValidator } from '../../helper/EmailValidator'
import { passwordValidator } from '../../helper/PasswordValidator'
import ShowDialog from '../../components/Dailog'
import { insertUserData } from '../../repositories/localRepo'
import CenteredButton from "../../components/button/Button";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ProgressBar from '../../components/ProgressBar';
import BackButton from '../../components/BackButton';


const ForgotPassScreen = ({ navigation }) => {

    const [email, setEmail] = useState({ value: '', error: '' })
    const { data, isLoader, isError } = useSelector(state => state.forgot);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const [password, setPassword] = useState({ value: '', error: '' })
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (data != null) {
            if (data.status == 200) {
                setVisible(true)
            } else {
                setVisible(true)
            }
        } else {
            if (isError) {
                setVisible(true)
            }
        }
    }, [data, isLoader, isError])

    const onForgotPressed = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        const emailValue = email.value
        dispatch(forgotPassword({ emailValue }))
    }

    function onDialogPressed() {
        setVisible(false)
        if (data.status == 200) {
            dispatch(resetForgotState())
            navigation.dispatch(
                CommonActions.navigate('OTP', {
                    email: email.value
                })
            )
        }
    }

    function resetValues() {
        setEmail({ value: '', error: '' });
        setPassword({ value: '', error: '' });
    }

    function goBack() {
        navigation.dispatch(CommonActions.goBack())
    }

    return (
        <Background>
            {isLoader ? <ProgressBar isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <View style={styles.container}>
                <BackButton goBack={goBack} />
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../../images/logo.png")}
                />

                <Text style={styles.title}>Forgot Password</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <TextInput
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
                    </View>
                </View>

                <CenteredButton
                    title="Send OTP"
                    onPress={onForgotPressed}
                    style={styles.button}
                />

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        resetValues()
                        navigation.dispatch(
                            CommonActions.navigate({
                                name: 'SignUp',
                                //params: { registrationType: "number" }
                            })
                        )
                    }}>
                        <Text style={styles.signUpLink}>Singup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
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
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    forgotPassword: {
        color: '#666',
        fontSize: 14
    },
    button: {
        paddingVertical: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    signUpText: {
        fontSize: 14,
        color: '#666'
    },
    signUpLink: {
        fontSize: 14,
        color: theme.colors.hyperlink,
        marginLeft: 5
    }
});

export default ForgotPassScreen;

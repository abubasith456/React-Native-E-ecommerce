import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import AnimatedBackground from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { CommonActions } from '@react-navigation/native';
import { theme } from '../theme/Theme'
import { emailValidator } from '../helper/EmailValidator'
import BackButton from '../components/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { forgotPassword } from '../repositories/apiRepo';
import ShowDialog from '../components/Dailog'
import { resetForgotState } from '../redux/slice/forgotSlice'
import ProgressBar from '../components/ProgressBar'

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const { data, isLoader, isError } = useSelector(state => state.forgot);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

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

    return (
        <AnimatedBackground>
            {isLoader ? <ProgressBar isLoading={isLoader} /> : null}
            {visible && !isLoader ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <BackButton goBack={goBack} />
            <View style={styles.cardContainer}>
                <Header>Forgot Password</Header>
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

                <Button mode="contained" onPress={onForgotPressed}>
                    Forgot
                </Button>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() =>
                        navigation.dispatch(
                            CommonActions.navigate({
                                name: 'SignUp',
                            })
                        )}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AnimatedBackground>
    )

    function goBack() {
        navigation.dispatch(CommonActions.goBack())
    }
}

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
    row: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 10,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
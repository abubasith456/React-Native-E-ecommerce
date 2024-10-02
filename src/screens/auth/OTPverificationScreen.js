import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { resetState } from '../../redux/loginRedux/loginSlice'
import Background from '../../components/Background';
import { theme } from '../../theme/Theme'
import ShowDialog from '../../components/Dailog'
import { insertUserData } from '../../repositories/localRepo'
import CenteredButton from "../../components/button/Button";
import ProgressBar from '../../components/ProgressBar';
import { OtpInput } from "react-native-otp-entry";
import BackButton from '../../components/BackButton';
import { otpValidator } from '../../helper/OTPValidator';
import { CommonActions } from '@react-navigation/native';


const OTPverificationScreen = ({ route, navigation }) => {

    const [otp, setOtp] = useState({ value: '', error: '' })
    const [visible, setVisible] = useState(false);
    const [clear, setClear] = useState(false);
    const dispatch = useDispatch();
    const { data, isLoader, isError } = useSelector(state => state.otpVerify);
    const email = "route.params.email"

    useEffect(() => {
        if (data != null) {
            console.log("Success!: " + data)
            if (data.status == 200) {
                dispatch(resetState());
                navigation.dispatch(
                    CommonActions.navigate('UpdatePassword', {
                        email: email
                    })
                );
            } else {
                setVisible(true)
            }
        }
    }, [data, isLoader, isError])

    const onVerifyClicked = () => {
        console.log("onVerfiyClicked called")
        const emailError = otpValidator(otp.value, 4)
        if (emailError) {
            setOtp({ ...otp, error: emailError })
            return
        }
        const otpValue = otp.value
        console.log(otpValue)
        console.log(email)
        dispatch(verifyOtp({ otpValue, email }))
    }

    function onDialogPressed() {
        setVisible(false)
    }

    function resetValues() {
        setEmail({ value: '', error: '' });
        setPassword({ value: '', error: '' });
    }

    return (
        <Background>
            {isLoader ? <ProgressBar isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <BackButton goBack={() => { }} />
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../../images/logo.png")}
                />

                <Text style={styles.title}>OTP verification</Text>
                <Text style={styles.subtitle}>Enter your OTP that recived on the respective main.</Text>

                <View style={styles.inputContainer}>
                    <OtpInput
                        numberOfDigits={4}
                        style={{ width: '100%', height: 100 }}
                        onTextChange={(text) => {
                            console.log(text)
                            setOtp({ value: text, error: '' });
                        }
                        }
                        onFilled={(code) => {
                            setOtp({ value: code, error: '' });
                            console.log(`Code is ${code}, you are good to go!`)
                        }}
                        theme={{
                            containerStyle: { width: '100%', height: 100, marginTop: 20 },
                            pinCodeTextStyle: { color: "black" }
                        }}
                    />
                    {otp.error ? <Text style={styles.error}>{otp.error}</Text> : null}
                </View>

                <TouchableOpacity onPress={() => {
                    resetValues();
                    /* navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Forgot',
                        })
                    ) */
                }} style={styles.resendContainer}>
                    <Text style={styles.resendText}>Resend</Text>
                </TouchableOpacity>

                <CenteredButton
                    title="Verify"
                    onPress={onVerifyClicked}
                    style={styles.button}
                />
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
    resendContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    resendText: {
        color: '#666',
        fontSize: 14
    },
    button: {
        paddingVertical: 10,
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    },
});

export default OTPverificationScreen;

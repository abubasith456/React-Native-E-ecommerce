import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import { theme } from '../theme/Theme'
import { otpValidator } from '../helper/OTPValidator'
import BackButton from '../components/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { verifyOtp } from '../repositories/apiRepo';
import ShowDialog from '../components/Dailog'
import Progress from '../components/ProgressBar'
import { OtpInput } from "react-native-otp-entry";
import { resetState } from '../redux/slice/otpVerificationSlice'

export default function OTPVerificationScreen({ route, navigation }) {
    const [otp, setOtp] = useState({ value: '', error: '' })
    const { data, isLoader, isError } = useSelector(state => state.otpVerify);
    const [visible, setVisible] = useState(false);
    const [clear, setClear] = useState(false);
    const dispatch = useDispatch();
    const email = route.params.email
    const otpInputRef = useRef(null);

    useEffect(() => {
        // otpInputRef.current.focusField(0);
        if (data != null) {
            console.log(" ME called" + data)
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

    const onVerfiyClicked = () => {
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
        setClear(true)
        setVisible(false)
        // otpInputRef.current.focusField(0);
    }

    return (
        <Background>
            {isLoader ? <Progress isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <BackButton goBack={goBack} />
            <View style={styles.cardContainer}>
                <Header>OTP verification</Header>
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
                <Button mode="contained" onPress={onVerfiyClicked} >
                    Verify
                </Button>
            </View>
        </Background>
    )

    function goBack() {
        console.log("Going back")
        navigation.dispatch(CommonActions.goBack())
    }
}

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
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        color: 'black'
    },
    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
})
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import AnimatedBackground from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../theme/Theme'
import { emailValidator } from '../helper/EmailValidator'
import { passwordValidator } from '../helper/PasswordValidator'
import { nameValidator } from '../helper/NameValidator'
import { CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../repositories/apiRepo';
import ShowDialog from '../components/Dailog'
import Progress from '../components/ProgressBar'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const { data, isLoader, isError } = useSelector(state => state.register);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (data != null) {
            if (data.status == 200) {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Home',
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
    }, [data, isLoader, isError])

    const onSignUpPressed = async () => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError || nameError || date == null) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        const usernameValue = name.value
        const emailValue = email.value
        const passwordValue = password.value
        const dateOfBirth = date.toISOString().split('T')[0]
        console.log(usernameValue)
        dispatch(register({ usernameValue, emailValue, passwordValue, dateOfBirth }))

    }

    function onDialogPressed() {
        setVisible(false)
    }

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // Close the picker on iOS
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleShowDatePicker = () => {
        setShowDatePicker(true);
    };

    return (
        <AnimatedBackground>
            {isLoader ? <Progress isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <BackButton goBack={goBack} />
            <View style={styles.cardContainer}>
                <Header>Create Account</Header>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                />
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
                    secureTextEntry
                />
                <View style={{
                    width: '100%',
                    marginVertical: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Date of birth: </Text>
                        <Text>{date ? date.toISOString().split('T')[0] : ''}</Text>
                    </View>
                    <Text style={{ color: theme.colors.primary }} onPress={handleShowDatePicker}>
                        Select Date
                    </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
                <Button
                    mode="contained"
                    onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
                >
                    Sign Up
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.link}>Login</Text>
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
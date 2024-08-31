// SignUpScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CenteredButton from "../../components/button/Button";
import Background from '../../components/Background';
import TextInput from '../../components/TextInput';
import Progress from '../../components/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme/Theme'
import { emailValidator } from '../../helper/EmailValidator'
import { passwordValidator } from '../../helper/PasswordValidator'
import { nameValidator } from '../../helper/NameValidator'
import { CommonActions, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../repositories/apiRepo';
import DateTimePicker from '@react-native-community/datetimepicker';
import ShowDialog from '../../components/Dailog';

const SignUpScreen = ({ navigation }) => {
    const route = useRoute();
    const registrationType = route.params?.registrationType || 'email';
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [mobileNumber, setMobileNumber] = useState({ value: '', error: '' }); // New mobile number state
    const { data, isLoader, isError } = useSelector(state => state.register);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (data != null) {
            if (data.status == 200) {
                /* navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Home',
                    })
                ) */
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
        const passwordError = passwordValidator(password.value)
        let emailError = '';
        let mobileNumberError = '';

        if (registrationType === 'email') {
            emailError = emailValidator(email.value);
        } else {
            mobileNumberError = mobileNumber.value ? null : 'Mobile number is required';
        }

        if (emailError || passwordError || nameError || (registrationType === 'email' && !email.value) || (registrationType === 'mobile' && !mobileNumber.value) || date == null) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setMobileNumber({ ...mobileNumber, error: mobileNumberError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        const usernameValue = name.value
        const emailValue = email.value
        const passwordValue = password.value
        const mobileValue = mobileNumber.value;
        const dateOfBirth = date.toISOString().split('T')[0]
        console.log(usernameValue)
        dispatch(register({ usernameValue, emailValue, mobileValue, passwordValue, dateOfBirth }))
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
        <Background>
            {isLoader ? <Progress isLoading={isLoader} /> : null}
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            <View style={styles.container}>
                {/* Logo */}
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../../images/logo.png")}
                />

                {/* Title and Subtitle */}
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Enter your credentials to continue</Text>

                {/* Username Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={(text) => setName({ value: text, error: '' })}
                        error={!!name.error}
                        errorText={name.error}
                    />
                </View>

                {/* Email Input */}
                {registrationType === 'email' ? <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
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
                    : <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            label="Mobile Number"
                            returnKeyType="next"
                            value={mobileNumber.value}
                            onChangeText={(text) => setMobileNumber({ value: text, error: '' })}
                            error={!!mobileNumber.error}
                            errorText={mobileNumber.error}
                            keyboardType="phone-pad"
                        />
                    </View>
                }

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            returnKeyType="done"
                            value={password.value}
                            onChangeText={(text) => setPassword({ value: text, error: '' })}
                            error={!!password.error}
                            errorText={password.error}
                            secureTextEntry={!showPassword}  // Toggle secureTextEntry based on state
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Date Picker */}
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: theme.colors.text, fontWeight: "bold" }} >Date of birth: </Text>
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

                {/* Sign Up Button */}
                <CenteredButton
                    title="Sign Up"
                    onPress={onSignUpPressed}
                    style={styles.button}
                />

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.footerLink}>Login</Text>
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
    logo: {
        height: 100, // Adjust height as needed
        width: "100%",  // Adjust width as needed
        marginBottom: 25,
        marginTop: 30
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
        marginBottom: 30
    },
    inputContainer: {
        marginBottom: 10
    },
    inputLabel: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    button: {
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 20,
    },
    gradient: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#8e8e8e',
    },
    footerLink: {
        fontSize: 14,
        color: theme.colors.hyperlink,
        fontWeight: 'bold',
    },
});

export default SignUpScreen;

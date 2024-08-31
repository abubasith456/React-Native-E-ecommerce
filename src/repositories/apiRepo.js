import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TextDecoder } from 'text-encoding';
import { myFcmToken } from '../constant/AppConstant';

const base_url = "https://hayat-shop.onrender.com"
const axiosInstance = axios.create({ baseURL: base_url })

// Login
export const login = createAsyncThunk('login', async (payload) => {
    const { emailValue, passwordValue, googleToken } = payload; // Destructure parameters

    // Prepare parameters based on provided login method
    let param = {};

    if (googleToken) {
        // If Google token is provided, only send the Google token
        param = { googleToken: googleToken };
    } else if (emailValue && passwordValue) {
        // If email and password are provided, send them
        param = {
            email: emailValue,
            password: passwordValue
        };
    } else {
        // If neither email/password nor Google token is provided, throw an error
        throw new Error('Either email/password or Google token must be provided.');
    }

    console.log("PARAMS => " + JSON.stringify(param));

    try {
        // Make the POST request with the appropriate parameters
        const res = await axiosInstance.post("/login", param);
        const final = res.data;
        console.log("LOGG => ", final);
        return final;
    } catch (error) {
        console.error("Error logging in: ", error);
        throw error; // Rethrow error to be handled by Redux or the component
    }
});


// Create User
export const register = createAsyncThunk('register', async (payload) => {
    const { usernameValue, emailValue, mobileValue, passwordValue, dateOfBirth } = payload;

    const isEmailRegistration = Boolean(emailValue);
    const url = isEmailRegistration ? "/register/email" : "/register/mobile";

    // Build request parameters based on the type of registration
    const param = {
        username: usernameValue,
        password: passwordValue,
        passwordConf: passwordValue,
        dateOfBirth
    };

    if (isEmailRegistration) {
        param.email = emailValue;
    } else {
        param.mobileNumber = mobileValue;
    }
    console.log("Register URL =>", url);
    console.log("Register called with params =>", param);
    const res = await axiosInstance.post(url, param);
    const response = await res.data;
    console.log("Register => ", response);
    return response;
});

// Forgot password
export const forgotPassword = createAsyncThunk('forgot', async (payload) => {
    const { emailValue } = payload;
    console.log("forgotPassword called => " + emailValue)
    const param = {
        email: emailValue
    }
    const res = await axiosInstance.post("/forgotPassword", param);
    const response = await res.data;
    return response;

});

// Forgot password / verify OTP
export const verifyOtp = createAsyncThunk('otpVerify', async (payload) => {
    const param = {
        email: payload.email,
        otp: payload.otpValue
    }
    const res = await axiosInstance.post("/forgotPassword/verify", param);
    const response = await res.data;
    return response;

});

// Update password
export const updatePassword = createAsyncThunk('passwordUpdate', async (payload) => {
    console.log(payload.email)
    const param = {
        email: payload.email,
        newPassword: payload.passwordValue,
        cnfrmNewPassword: payload.confirmPasswordValue
    }
    const res = await axiosInstance.post("/changePassword", param);
    const response = await res.data;
    return response;

});

export const getBanners = createAsyncThunk('banner', async () => {
    console.log("Banner")
    const res = await axiosInstance.get("/banner");
    const response = await res.data;
    console.log("TEST =>" + JSON.stringify(response))
    return response;
});


export const home = createAsyncThunk('home', async (payload) => {
    console.log(payload.userId)
    const userId = payload.userId
    const fcmData = {
        "unique_id": userId,
        "pushToken": myFcmToken._myValue
    }
    axiosInstance.post("/fcm/pushToken", fcmData).then((result) => {
        console.log("Push Token pushed");
    }).catch((err) => {
        console.log(err);
    })
    const res = await axiosInstance.get("/home");
    const response = await res.data;
    console.log("TEST =>" + JSON.stringify(response))
    return response;
});

export const products = createAsyncThunk('products', async (payload) => {
    console.log(payload);
    const productName = payload.productName;
    const res = await axiosInstance.get("/" + productName);
    const response = await res.data;
    console.log("Products =>" + JSON.stringify(response))
    return response;
});

export const profile = createAsyncThunk('profile', async (payload) => {
    console.log(payload);
    const requesstData = {
        userId: payload.userId
    }
    const res = await axiosInstance.post("/profile", requesstData);
    const response = await res.data;
    console.log("Profile =>" + JSON.stringify(response))
    return response;
});

export const orders = createAsyncThunk('orders', async (payload) => {
    console.log(payload);
    const userId = payload.userId
    try {
        const response = await axiosInstance.get(`/orders/${userId}`, {
            responseType: 'arraybuffer',
        });

        // Process the streamed data
        const data = new TextDecoder().decode(new Uint8Array(response.data));
        const parsedData = JSON.parse(data);

        // Return the parsed data
        return parsedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be caught by the rejected action
    }
});

export const placeOrder = createAsyncThunk('placeOrder', async (payload) => {
    const requesstData = payload.orders;
    console.log(requesstData);
    const res = await axiosInstance.post('/orders', requesstData);
    console.log("ORDER =>" + JSON.stringify(res));
    const response = await res.data;
    console.log("ORDER =>" + JSON.stringify(response))
    return response;
});

export const updateProfile = createAsyncThunk('updateProfile', async (payload) => {
    const filename = payload.image.split('/').pop();
    const formData = new FormData();
    formData.append('file', { uri: payload.image, name: filename, type: 'image/jpeg' }); // Assuming JPEG image
    formData.append('userId', payload.userId);
    console.log("updateProfile =>", JSON.stringify(formData));
    try {
        const res = await axiosInstance.post('/profileUpdate', formData, { // Adjust headers for multipart/form-data if using formData
            headers: {
                'Content-Type': 'multipart/form-data' // Optional if using formData
            }
        });
        console.log("Response =>", res.data);
        return res.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error; // Rethrow error for the UI to handle
    }
});
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TextDecoder } from 'text-encoding';

const base_url = "https://hayat-shop.onrender.com"
const axiosInstance = axios.create({ baseURL: base_url })

// Login
export const login = createAsyncThunk('login', async (payload) => {
    const { emailValue, passwordValue } = payload; // Destructure parameters
    const param = {
        email: emailValue,
        password: passwordValue
    }
    const res = await axiosInstance.post("/login", param);
    const final = await res.data;
    return final;
});


// Create User
export const register = createAsyncThunk('register', async (payload) => {
    const { usernameValue, emailValue, passwordValue } = payload;
    console.log("register called => " + usernameValue)
    const param = {
        email: emailValue,
        username: usernameValue,
        "dateOfBirth": "13042000",
        "mobileNumber": "1234567890",
        password: passwordValue,
        passwordConf: passwordValue
    }

    const res = await axiosInstance.post("/register", param);
    const response = await res.data;
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
    const res = await axiosInstance.get("/home?id=" + userId);
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
        const response = await axiosInstance.get(`/orders?unique_id=${userId}`, {
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
import { configureStore, com } from '@reduxjs/toolkit';
import loginSlice from '../loginRedux/loginSlice';
import registerSlice from '../slice/registerSlice';
import forgotSlice from '../slice/forgotSlice';
import otpVerificationSlice from '../slice/otpVerificationSlice';
import updatePasswordSlice from '../slice/updatePasswordSlice';
import bannerSlice from '../slice/bannerSlice';
import home from '../slice/home';
import products from '../slice/products';
import profileSlice from '../slice/profileSlice'
import ordersSlice from '../slice/ordersSlice';


export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    forgot: forgotSlice,
    otpVerify: otpVerificationSlice,
    updatePassword: updatePasswordSlice,
    banner: bannerSlice,
    home: home,
    products: products,
    profile: profileSlice,
    orders: ordersSlice
  },
});
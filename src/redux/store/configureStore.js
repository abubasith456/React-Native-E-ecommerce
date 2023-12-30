import { configureStore, com } from '@reduxjs/toolkit';
import loginSlice from '../loginRedux/loginSlice';
import registerSlice from '../slice/registerSlice';
import forgotSlice from '../slice/forgotSlice';
import otpVerificationSlice from '../slice/otpVerificationSlice';
import updatePasswordSlice from '../slice/updatePasswordSlice';
import bannerSlice from '../slice/bannerSlice';
import home from '../slice/home';


export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    forgot: forgotSlice,
    otpVerify: otpVerificationSlice,
    updatePassword: updatePasswordSlice,
    banner: bannerSlice,
    home, home,
  },
});
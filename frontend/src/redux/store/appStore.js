import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";

const appStore = configureStore({
   reducer:{
    auth:AuthReducer
   }
})

export default appStore;
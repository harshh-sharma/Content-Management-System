import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";
import domainReducer from "../slices/domainSlice";

const appStore = configureStore({
   reducer:{
    auth:AuthReducer,
    domain:domainReducer
   }
})

export default appStore;
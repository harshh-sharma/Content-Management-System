import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";
import domainReducer from "../slices/domainSlice";
import pageReducer from "../slices/pageSlice";

const appStore = configureStore({
   reducer:{
    auth:AuthReducer,
    domain:domainReducer,
    page:pageReducer
   }
})

export default appStore;
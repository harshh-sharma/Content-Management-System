import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";
import domainReducer from "../slices/domainSlice";
import pageReducer from "../slices/pageSlice";
import contentReducer from "../slices/contentSlice"

const appStore = configureStore({
   reducer:{
    auth:AuthReducer,
    domain:domainReducer,
    page:pageReducer,
    content:contentReducer
   }
})

export default appStore;
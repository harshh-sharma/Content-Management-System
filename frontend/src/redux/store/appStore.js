import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";
import domainReducer from "../slices/domainSlice";
import pageReducer from "../slices/pageSlice";
import contentReducer from "../slices/contentSlice";
import sectionReducer from "../slices/sectionSlice";

const appStore = configureStore({
   reducer:{
    auth:AuthReducer,
    domain:domainReducer,
    page:pageReducer,
    section:sectionReducer,
    content:contentReducer
   }
})

export default appStore;
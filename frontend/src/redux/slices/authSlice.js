import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk('/auth',(data) => {
    
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false,
        'x-access-token':null
    },
    // reducers:{}
})

export default authSlice.reducer;
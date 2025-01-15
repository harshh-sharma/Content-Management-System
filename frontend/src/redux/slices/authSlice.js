import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post("/user/register", data),
        {
          pending: "Registering...",
          success: "User successfully registered",
          error:  data =>  {
              // `data` contains the error object
              console.log("data",data);
              
              return data?.response?.data?.message || "Registration failed";
            },
        }
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue to pass error payload to rejected action
      return rejectWithValue(error?.response?.data?.success);
    }
  }
);


const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false,
        'x-access-token':null
    },
    // reducers:{}
    extraReducers:(builder) => {
      builder.addCase(register?.fulfilled,(state,action) => {
        console.log("action",action);
        
          state.isLoggedIn = true
          state["x-access-token"] = action.payload.token
      })
    }
})

export default authSlice.reducer;
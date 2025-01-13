import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      // Show loading toast
      const loadingToastId = toast.loading('Registering...');

      // Send POST request to register user
      const response = await axiosInstance.post('/user/register', data);

      // Update toast to success
      toast.update(loadingToastId, {
        render: 'Registration successful!',
        type: 'success',
        isLoading: false,
        autoClose: 5000
      });

      return response.data; // Assuming the API returns data in response.data
    } catch (error) {
      // Show error toast
      toast.error('Registration failed. Please try again.');

      // Reject the error with a value
      return rejectWithValue(error.response.data || 'Something went wrong');
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
})

export default authSlice.reducer;